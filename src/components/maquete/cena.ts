// Maquete da casa térrea do Jardim Europa + posição do sol em São Paulo (latitude ~23,5° S).
// Eixos: +z = norte (frente da casa, sala e jardim), +x = leste. Unidade: metro.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type Estacao = "verao" | "inverno";

const ELEVACAO_MAXIMA: Record<Estacao, number> = { verao: 88, inverno: 43 };

// Aproximação didática: nasce a leste às 6h, passa pelo norte ao meio-dia, põe a oeste às 18h.
export function posicaoDoSol(hora: number, estacao: Estacao) {
  const t = Math.min(Math.max((hora - 6) / 12, 0), 1);
  const azimute = THREE.MathUtils.degToRad(90 - 180 * t);
  const elevacao = THREE.MathUtils.degToRad(Math.max(ELEVACAO_MAXIMA[estacao] * Math.sin(Math.PI * t), 2));
  return new THREE.Vector3(
    Math.sin(azimute) * Math.cos(elevacao),
    Math.sin(elevacao),
    Math.cos(azimute) * Math.cos(elevacao),
  );
}

export const FACHADAS = [
  { nome: "sala e jardim", lado: "norte", normal: new THREE.Vector3(0, 0, 1) },
  { nome: "suítes", lado: "leste", normal: new THREE.Vector3(1, 0, 0) },
  { nome: "cozinha e área gourmet", lado: "oeste", normal: new THREE.Vector3(-1, 0, 0) },
  { nome: "garagem e serviço", lado: "sul", normal: new THREE.Vector3(0, 0, -1) },
];

export function fachadasComSol(sol: THREE.Vector3) {
  const horizontal = new THREE.Vector3(sol.x, 0, sol.z).normalize();
  return FACHADAS.filter((f) => f.normal.dot(horizontal) > 0.2);
}

const COR = {
  concreto: 0xcfcac2,
  laje: 0xd8d3cb,
  madeira: 0x6b4430,
  vidro: 0x9fb4b0,
  agua: 0x3f6f6a,
  grama: 0x5d7449,
  copa: 0x2f4a33,
  tronco: 0x5a4636,
  base: 0xe4e2dd,
};

function caixa(l: number, a: number, p: number, cor: number, x: number, y: number, z: number, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  const malha = new THREE.Mesh(new THREE.BoxGeometry(l, a, p), new THREE.MeshStandardMaterial({ color: cor, roughness: 0.85, ...extra }));
  malha.position.set(x, y, z);
  malha.castShadow = true;
  malha.receiveShadow = true;
  return malha;
}

function construirCasa() {
  const casa = new THREE.Group();
  // Terreno e jardim
  const base = new THREE.Mesh(new THREE.BoxGeometry(46, 0.4, 40), new THREE.MeshStandardMaterial({ color: COR.base, roughness: 1 }));
  base.position.y = -0.2;
  base.receiveShadow = true;
  casa.add(base);
  const grama = caixa(40, 0.06, 15, COR.grama, 0, 0.03, 10.5, { roughness: 1 });
  grama.castShadow = false;
  casa.add(grama);

  // Piso, núcleos de madeira, interior e laje em balanço (pé-direito de 4 m para a fachada aparecer)
  casa.add(caixa(26, 0.3, 13, COR.concreto, 0, 0.15, -3));
  casa.add(caixa(3.2, 4, 9, COR.madeira, -10.6, 2.3, -4.5)); // cozinha (oeste)
  casa.add(caixa(3.2, 4, 9, COR.madeira, 10.6, 2.3, -4.5)); // suítes (leste)
  casa.add(caixa(17.6, 4, 0.4, 0x9c7656, 0, 2.3, -8.6)); // fundo da sala em madeira clara (sul)
  casa.add(caixa(9, 0.7, 3, 0xe9e2d6, -2, 0.65, -4)); // sofá
  casa.add(caixa(5, 0.9, 2, 0x7a5a42, 5, 0.75, -3)); // mesa de jantar
  const vidro = caixa(18, 4, 0.08, COR.vidro, 0, 2.3, 2.4, { transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0.2 });
  vidro.castShadow = false;
  casa.add(vidro);
  casa.add(caixa(31, 0.45, 17, COR.laje, 0, 4.52, -2.4)); // laje com 2,5 m de balanço
  for (const x of [-7, 0, 7]) casa.add(caixa(0.25, 4, 0.25, COR.concreto, x, 2.3, 3.2));

  // Espelho d'água e piscina ao norte
  const agua = caixa(20, 0.12, 3.6, COR.agua, -2, 0.08, 9.6, { roughness: 0.15, metalness: 0.1 });
  agua.castShadow = false;
  casa.add(agua);
  casa.add(caixa(21, 0.18, 0.3, COR.concreto, -2, 0.1, 11.55));

  // Árvores (copa baixa poligonal, linguagem de maquete)
  const copaGeo = new THREE.IcosahedronGeometry(1, 0);
  const copaMat = new THREE.MeshStandardMaterial({ color: COR.copa, roughness: 1, flatShading: true });
  const troncoMat = new THREE.MeshStandardMaterial({ color: COR.tronco, roughness: 1 });
  const arvores: [number, number, number][] = [[-17, 14, 2.6], [15, 13, 3], [17, 4, 2.2], [-18, -2, 2.4], [12, 16.5, 2], [-13, 16, 1.8]];
  for (const [x, z, r] of arvores) {
    const tronco = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 3.4, 6), troncoMat);
    tronco.position.set(x, 1.7, z);
    tronco.castShadow = true;
    const copa = new THREE.Mesh(copaGeo, copaMat);
    copa.scale.setScalar(r);
    copa.position.set(x, 3.4 + r * 0.7, z);
    copa.castShadow = true;
    casa.add(tronco, copa);
  }
  return casa;
}

export function criarCena(canvas: HTMLCanvasElement, opcoes: { leve: boolean; girar: boolean }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !opcoes.leve, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opcoes.leve ? 1.25 : 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const cena = new THREE.Scene();
  const corCeu = new THREE.Color(0xe4e2dd);
  cena.background = corCeu;

  // Vista 3/4 pela frente (norte), baixa o bastante para ver vidro e madeira sob a laje.
  const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 400);
  camera.position.set(30, 17, 62);

  const controles = new OrbitControls(camera, canvas);
  controles.enableDamping = true;
  controles.enablePan = false;
  controles.minDistance = 45;
  controles.maxDistance = 110;
  controles.minPolarAngle = THREE.MathUtils.degToRad(45);
  controles.maxPolarAngle = THREE.MathUtils.degToRad(80);
  controles.target.set(0, 1.2, 1);
  controles.autoRotate = opcoes.girar;
  controles.autoRotateSpeed = 0.35;

  const hemisferio = new THREE.HemisphereLight(0xf2efe9, 0x6d6457, 0.9);
  cena.add(hemisferio);
  const sol = new THREE.DirectionalLight(0xfff1dc, 2.6);
  sol.castShadow = true;
  sol.shadow.mapSize.setScalar(opcoes.leve ? 1024 : 2048);
  sol.shadow.camera.left = -30;
  sol.shadow.camera.right = 30;
  sol.shadow.camera.top = 30;
  sol.shadow.camera.bottom = -30;
  sol.shadow.camera.far = 160;
  sol.shadow.bias = -0.0004;
  sol.shadow.normalBias = 0.03;
  cena.add(sol, sol.target);

  const disco = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16), new THREE.MeshBasicMaterial({ color: 0xf0b05a }));
  cena.add(disco, construirCasa());

  const quente = new THREE.Color(0xe8c39a);
  const claro = new THREE.Color(0xdfe3e1);

  function ajustarSol(hora: number, estacao: Estacao) {
    const direcao = posicaoDoSol(hora, estacao);
    sol.position.copy(direcao).multiplyScalar(70);
    disco.position.copy(direcao).multiplyScalar(58);
    const altura = direcao.y; // 0 no horizonte, 1 a pino
    sol.intensity = 0.6 + 2.4 * Math.min(altura * 1.6, 1);
    sol.color.copy(quente).lerp(new THREE.Color(0xfff6ea), Math.min(altura * 1.5, 1));
    corCeu.copy(quente).lerp(claro, Math.min(altura * 1.4, 1));
    return direcao;
  }

  function redimensionar() {
    const { clientWidth: l, clientHeight: a } = canvas;
    renderer.setSize(l, a, false);
    camera.aspect = l / a;
    camera.fov = camera.aspect < 1.4 ? 37 : 30; // tela estreita: abre o ângulo para caber a casa inteira
    camera.updateProjectionMatrix();
  }
  redimensionar();

  let ativo = true;
  renderer.setAnimationLoop(() => {
    if (!ativo) return;
    controles.update();
    renderer.render(cena, camera);
  });

  return {
    ajustarSol,
    redimensionar,
    pausar(valor: boolean) {
      ativo = !valor;
    },
    pararGiro() {
      controles.autoRotate = false;
    },
    destruir() {
      renderer.setAnimationLoop(null);
      controles.dispose();
      cena.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
    },
  };
}
