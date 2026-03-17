'use client';

import { memo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from 'reactflow';
import { architectureNodeDetails } from '@/lib/portfolio';
import 'reactflow/dist/style.css';

type ArchitectureData = {
  label: string;
  description: string;
};

const ArchitectureNode = memo(({ data }: NodeProps<ArchitectureData>) => (
  <div className="group relative w-56 rounded-3xl border border-cyan-400/20 bg-slate-950/90 p-4 shadow-[0_0_30px_rgba(56,189,248,0.12)]">
    <Handle type="target" position={Position.Top} className="!border-cyan-300 !bg-cyan-400" />
    <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-3">
      <p className="text-sm font-semibold text-cyan-100">{data.label}</p>
      <p className="mt-2 text-xs leading-5 text-slate-400">{data.description}</p>
    </div>
    <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-slate-700 bg-slate-950/95 p-3 text-xs leading-5 text-slate-300 opacity-0 shadow-xl transition duration-200 group-hover:opacity-100">
      {data.description}
    </div>
    <Handle type="source" position={Position.Bottom} className="!border-indigo-300 !bg-indigo-400" />
  </div>
));

ArchitectureNode.displayName = 'ArchitectureNode';

const nodeTypes = { architecture: ArchitectureNode };

const nodes: Node<ArchitectureData>[] = architectureNodeDetails.map((item, index) => ({
  id: item.label,
  type: 'architecture',
  position: {
    x: index % 2 === 0 ? 40 : 370,
    y: index * 108,
  },
  data: {
    label: item.title,
    description: item.description,
  },
  draggable: true,
}));

const edges: Edge[] = [
  ['User Query', 'Embedding Model'],
  ['Embedding Model', 'Vector Database (FAISS)'],
  ['Vector Database (FAISS)', 'Retriever'],
  ['Retriever', 'Prompt Builder'],
  ['Prompt Builder', 'LLM (Gemini)'],
  ['LLM (Gemini)', 'Response Generator'],
].map(([source, target], index) => ({
  id: `${source}-${target}`,
  source,
  target,
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: index % 2 === 0 ? '#38BDF8' : '#6366F1',
  },
  style: {
    stroke: index % 2 === 0 ? '#38BDF8' : '#6366F1',
    strokeWidth: 2.2,
  },
}));

export default function RAGSimulator() {
  return (
    <div className="glass-panel overflow-hidden rounded-[2rem] p-3">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2 pt-2">
        <div>
          <p className="text-sm font-medium text-white">Interactive RAG Simulator</p>
          <p className="text-sm text-slate-400">Drag nodes, zoom the canvas, and inspect the retrieval pipeline.</p>
        </div>
        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-100">
          React Flow
        </div>
      </div>
      <div className="h-[640px] rounded-[1.5rem] border border-slate-800 bg-slate-950/70">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.4}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(56, 189, 248, 0.08)" gap={24} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
