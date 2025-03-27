import { Node, InputOutputType, Graph } from './types';

/**
 * Interface for Node constructor parameters
 */
export interface NodeParams {
  id: string;
  name: string;
  color?: string;
  level?: number;
  inputs?: InputOutputType[];
  outputs?: InputOutputType[];
}

/**
 * Constructor for creating Node objects
 */
export class NodeConstructor implements Node {
  id: string;
  color: string;
  name: string;
  inputs: InputOutputType[];
  outputs: InputOutputType[];
  level: number;

  /**
   * Create a new Node
   * @param params Object containing node parameters
   */
  constructor(params: NodeParams) {
    this.id = params.id;
    this.name = params.name;
    this.color = params.color || "#000000";
    this.level = params.level || 0;
    this.inputs = params.inputs || [];
    this.outputs = params.outputs || [];
  }

  /**
   * Add an input to the node
   * @param input Input specification to add
   * @returns The updated node for chaining
   */
  addInput(input: InputOutputType): NodeConstructor {
    this.inputs.push(input);
    return this;
  }

  /**
   * Add an output to the node
   * @param output Output specification to add
   * @returns The updated node for chaining
   */
  addOutput(output: InputOutputType): NodeConstructor {
    this.outputs.push(output);
    return this;
  }

  /**
   * Set the level of the node in the graph
   * @param level The level to set
   * @returns The updated node for chaining
   */
  setLevel(level: number): NodeConstructor {
    this.level = level;
    return this;
  }
}

/**
 * Interface for InputOutputType constructor parameters
 */
export interface IOTypeParams {
  number: number;
  type: string;
  typeName: string;
  name: string;
}

/**
 * Constructor for creating InputOutputType objects
 */
export class IOTypeConstructor implements InputOutputType {
  number: number;
  type: string;
  typeName: string;
  name: string;

  /**
   * Create a new InputOutputType
   * @param params Object containing input/output parameters
   */
  constructor(params: IOTypeParams) {
    this.number = params.number;
    this.type = params.type;
    this.typeName = params.typeName;
    this.name = params.name;
  }
}

/**
 * Type for edge connections between nodes
 */
export interface EdgeConnection {
  from: string;
  to: string;
}

/**
 * Interface for Graph constructor parameters
 */
export interface GraphParams {
  prompt?: string;
  nodes?: Node[];
  edges?: EdgeConnection[];
}

/**
 * Constructor for creating Graph objects
 */
export class GraphConstructor implements Graph {
  prompt: string;
  nodes: Node[];
  edges: EdgeConnection[];

  /**
   * Create a new Graph
   * @param params Object containing graph parameters
   */
  constructor(params: GraphParams = {}) {
    this.prompt = params.prompt || "";
    this.nodes = params.nodes || [];
    this.edges = params.edges || [];
  }

  /**
   * Add a node to the graph
   * @param node The node to add
   * @returns The updated graph for chaining
   */
  addNode(node: Node): GraphConstructor {
    this.nodes.push(node);
    return this;
  }

  /**
   * Add an edge connection between nodes
   * @param from Source node ID and output port (e.g., "node1.1")
   * @param to Target node ID and input port (e.g., "node2.1")
   * @returns The updated graph for chaining
   */
  addEdge(from: string, to: string): GraphConstructor {
    this.edges.push({ from, to });
    return this;
  }

  /**
   * Set the prompt for the graph
   * @param prompt The prompt to set
   * @returns The updated graph for chaining
   */
  setPrompt(prompt: string): GraphConstructor {
    this.prompt = prompt;
    return this;
  }
}