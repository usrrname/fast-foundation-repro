import { Constructable, FASTElement, FASTElementDefinition } from "@microsoft/fast-element";
/**
 * Used to designate a template's dependency on another custom element.
 * @beta
 */
export type TemplateElementDependency = string | FASTElementDefinition | Constructable<FASTElement>;
/**
 * Determines what HTML tag name to use for the dependency.
 * @param dependency - The dependency the template is dependent on.
 * @returns The tag name to use in markup.
 * @beta
 */
export declare function tagFor(dependency: TemplateElementDependency): string;
