import React from 'react';
import { useState, useCallback } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, Controls, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import startActivities from "../data/start_activities.json"

const initialEdges = []

const initialNodes = Object.keys(startActivities).map((key, index) => {
    return {
        id: `${index}`,
        position: {
            x: index * 10 * Math.floor(Math.random() * 5),
            y: startActivities[key] * 10 * Math.floor(Math.random() * 5),
        },
        data: {label : key},
    };
});

const Flow = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);

    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    return (
        <div style={{ height: '86vh' }}>
            <ReactFlow 
                nodes={nodes}
                onNodesChange={onNodesChange} 
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default Flow;