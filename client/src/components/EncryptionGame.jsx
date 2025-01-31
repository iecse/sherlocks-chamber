import {useState} from "react"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toolbar } from './Toolbar';
import { Playground } from './Playground';
import { BLOCK_TYPES } from "./Block"

export const EncryptionGame = () => {
    const [blocks, setBlocks] = useState([
        { id: 'f1', type: BLOCK_TYPES.FUNCTION, value: 'SHA256' },
        { id: 'f2', type: BLOCK_TYPES.FUNCTION, value: 'MD5' },
        { id: 'o1', type: BLOCK_TYPES.OPERATOR, value: '+' },
        { id: 'o2', type: BLOCK_TYPES.OPERATOR, value: '*' },
        { id: 'o3', type: BLOCK_TYPES.OPERATOR, value: '%' },
        { id: 'c1', type: BLOCK_TYPES.CONSTANT, value: '42' },
        { id: 'p1', type: BLOCK_TYPES.PLAINTEXT, value: 'Hello World' }
    ]);

    const [playgroundBlocks, setPlaygroundBlocks] = useState([]);

    const handleDrop = (item, targetId) => {
        if (!targetId) {
            // Dropping onto the playground
            setPlaygroundBlocks(prev => [...prev, { ...item }]);
            setBlocks(prev => prev.filter(block => block.id !== item.id));
        } else {
            // Dropping onto another block
            const targetBlock = playgroundBlocks.find(block => block.id === targetId);
            if (targetBlock) {
                setPlaygroundBlocks(prev =>
                    prev.map(block =>
                        block.id === targetId
                            ? { ...block, children: [...(block.children || []), item] }
                            : block
                    )
                );
            }
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container mx-auto p-4 space-y-8">
                <Toolbar blocks={blocks} onDrop={handleDrop} />
                <Playground onDrop={handleDrop} blocks={playgroundBlocks} />
            </div>
        </DndProvider>
    );
};