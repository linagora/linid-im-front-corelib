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
     * Display label of the node.
     */
    label: string;
    /**
     * Icon name associated with the node.
     */
    icon: string;
    /**
     * Child nodes nested under this node.
     */
    nodes: TreeNode[];
};
