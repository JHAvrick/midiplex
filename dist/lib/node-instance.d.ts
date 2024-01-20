import { MidiplexMessage } from "./midiplex-message";
type NodeInstanceOutputEdgeKey<D extends MidiplexNodeTypeDescription> = keyof D['outputs'] | 'thru';
/**
 * This class is the runtime representation of a node definition. It manages the node's state, props, edges,
 * events, connections, etc.
 */
declare class MidiplexNodeInstance<D extends MidiplexNodeTypeDescription> {
    readonly key: string;
    readonly definition: MidiplexNodeDefinition<D>;
    protected props: Map<keyof D['props'], any>;
    protected state: Map<keyof D['state'], any>;
    protected inputs: Map<keyof D['inputs'], MidiplexEdgeInstance<D>>;
    private outputs;
    private receiveHandler;
    private updateHandler;
    constructor(key: string, node: MidiplexNodeDefinition<D>, config?: NodeConfig<D>);
    protected bindReceive(handler: (message: MidiplexMessage, edgeKey: keyof D['inputs']) => void): void;
    protected bindUpdate(handler: () => void): void;
    protected getOrSetStateInternal<T extends keyof D['state']>(stateKey: T, value?: D['state'][T]): D['state'][T];
    getState<T extends keyof D['state']>(stateKey: T): D['state'][T];
    getProp<T extends keyof D['props']>(propKey: T): D['props'][T];
    setProp<T extends keyof D['props']>(propKey: T, value: D['props'][T]): D['props'][T];
    /**
     * Returns the first edge instance. This is used when no edge is specified.
     *
     * @returns The first defined edge instance
     */
    protected getDefaultEdge(): MidiplexEdgeInstance<D> | undefined;
    getInputEdge(edgeKey: keyof D['inputs']): MidiplexEdgeInstance<D>;
    connect(edgeKey: NodeInstanceOutputEdgeKey<D>, to: MidiplexEdgeInstance<any>): void;
    /**
     * Disconnects an edge from this node. If the connection does not exist, returns false,
     * otherwise returns true.
     */
    disconnect<T extends keyof D['inputs']>(edgeKey: T, to: MidiplexEdgeInstance<D>): boolean;
    private send;
    receive(message: MidiplexMessage, edge: string): void;
}
export { MidiplexNodeInstance };
