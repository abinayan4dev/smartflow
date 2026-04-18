import { useRef, useMemo, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const particleCount = 150;
const maxDistance = 2.5;

// Declared once at module level — never re-allocated inside the render loop
const LINE_COLOR = new THREE.Color('#3b82f6');

function Network() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsMaterialRef = useRef<THREE.PointsMaterial>(null);

  const { viewport } = useThree();

  const [positions, velocities, baseVelocities, colors, particlesData] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const baseVelocities = [];
    const colors = new Float32Array(particleCount * 3);
    const particlesData = [];

    const colorBlue = new THREE.Color('#3b82f6');
    const colorPurple = new THREE.Color('#8b5cf6');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const vx = (Math.random() - 0.5) * 0.015;
      const vy = (Math.random() - 0.5) * 0.015;
      const vz = (Math.random() - 0.5) * 0.015;

      velocities.push({ x: vx, y: vy, z: vz });
      baseVelocities.push({ x: vx, y: vy, z: vz });

      const rand = Math.random();
      let c;
      if (rand < 0.7) c = colorBlue;
      else if (rand < 0.9) c = colorPurple;
      else c = colorWhite;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      particlesData.push({ numConnections: 0 });
    }

    return [positions, velocities, baseVelocities, colors, particlesData];
  }, []);

  const [linePositions, lineColors] = useMemo(() => {
    const maxLines = particleCount * particleCount;
    return [new Float32Array(maxLines * 3), new Float32Array(maxLines * 3)];
  }, []);

  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetMouseRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const mouseX = (state.mouse.x * viewport.width) / 2;
    const mouseY = (state.mouse.y * viewport.height) / 2;
    targetMouseRef.current.set(mouseX, mouseY, 0);
    mouseRef.current.lerp(targetMouseRef.current, 0.1);

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < particleCount; i++)
      particlesData[i].numConnections = 0;

    for (let i = 0; i < particleCount; i++) {
      const particleData = particlesData[i];

      const dxMouse = mouseRef.current.x - positions[i * 3];
      const dyMouse = mouseRef.current.y - positions[i * 3 + 1];
      const dzMouse = mouseRef.current.z - positions[i * 3 + 2];
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse + dzMouse * dzMouse);

      if (distMouse < 4) {
        const force = (4 - distMouse) * 0.002;
        velocities[i].x -= (dxMouse / distMouse) * force;
        velocities[i].y -= (dyMouse / distMouse) * force;
        velocities[i].z -= (dzMouse / distMouse) * force;
      }

      velocities[i].x += (baseVelocities[i].x - velocities[i].x) * 0.05;
      velocities[i].y += (baseVelocities[i].y - velocities[i].y) * 0.05;
      velocities[i].z += (baseVelocities[i].z - velocities[i].z) * 0.05;

      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      const limitX = 12;
      const limitY = 12;
      const limitZ = 6;

      if (positions[i * 3] > limitX) positions[i * 3] = -limitX;
      if (positions[i * 3] < -limitX) positions[i * 3] = limitX;
      if (positions[i * 3 + 1] > limitY) positions[i * 3 + 1] = -limitY;
      if (positions[i * 3 + 1] < -limitY) positions[i * 3 + 1] = limitY;
      if (positions[i * 3 + 2] > limitZ) positions[i * 3 + 2] = -limitZ;
      if (positions[i * 3 + 2] < -limitZ) positions[i * 3 + 2] = limitZ;

      for (let j = i + 1; j < particleCount; j++) {
        const particleDataB = particlesData[j];

        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          particleData.numConnections++;
          particleDataB.numConnections++;

          const alpha = 1.0 - dist / maxDistance;

          linePositions[vertexpos++] = positions[i * 3];
          linePositions[vertexpos++] = positions[i * 3 + 1];
          linePositions[vertexpos++] = positions[i * 3 + 2];

          linePositions[vertexpos++] = positions[j * 3];
          linePositions[vertexpos++] = positions[j * 3 + 1];
          linePositions[vertexpos++] = positions[j * 3 + 2];

          // Use the module-level LINE_COLOR — no allocation per frame
          const cr = LINE_COLOR.r * alpha;
          const cg = LINE_COLOR.g * alpha;
          const cb = LINE_COLOR.b * alpha;

          lineColors[colorpos++] = cr;
          lineColors[colorpos++] = cg;
          lineColors[colorpos++] = cb;

          lineColors[colorpos++] = cr;
          lineColors[colorpos++] = cg;
          lineColors[colorpos++] = cb;

          numConnected++;
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, numConnected * 2);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      linesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }

    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.size = 0.08 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMaterialRef}
          size={0.08}
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.6}
        />
      </lineSegments>
    </group>
  );
}

function CursorLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (lightRef.current) {
      const mouseX = (state.mouse.x * viewport.width) / 2;
      const mouseY = (state.mouse.y * viewport.height) / 2;
      lightRef.current.position.lerp(new THREE.Vector3(mouseX, mouseY, 2), 0.05);
    }
  });

  return <pointLight ref={lightRef} intensity={2} color="#ffffff" distance={8} />;
}

// Graceful degradation if WebGL is unavailable or throws
class Hero3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-0 opacity-60 md:opacity-80 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      );
    }
    return this.props.children;
  }
}

export default function Hero3D() {
  return (
    <Hero3DErrorBoundary>
      <div className="absolute inset-0 z-0 opacity-60 md:opacity-80">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.2} />
          <Network />
          <CursorLight />
        </Canvas>
      </div>
    </Hero3DErrorBoundary>
  );
}
