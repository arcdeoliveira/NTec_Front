import { TreeNode } from "angular13-organization-chart";

export interface ColaboradorNode extends TreeNode {
    name: string;
    description?: string;
    image?: string;
    children: ColaboradorNode[];
}