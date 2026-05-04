/**
 * Represents a node in the tree structure.
 */
export type TreeNode = {
    /**
     * The type of the node.
     */
    type: string;
    /**
     * Unique key identifying the node within the tree.
     */
    key: string;
    /**
     * The value associated with the node, which can be a string, number, or an object for complex nodes.
     */
    value: string | number | Record<string, unknown>;
    /**
     * Child nodes nested under this node.
     */
    nodes: TreeNode[];
    /**
     * Additional actions specific to this node instance, merged with the
     * default actions defined by the matching `TreeNodeType`.
     */
    extraActions?: string[];
};
/**
 * Describes a node-type definition: an identifier and the default
 * actions available to every node of this type.
 */
export type TreeNodeType = {
    /**
     * The type of the node.
     */
    type: string;
    /**
     * Default actions associated with this node type.
     */
    actions: string[];
};
