import { __decorate } from "tslib";
import { attr, bind, FASTElement, observable, RepeatDirective, } from "@microsoft/fast-element";
import { ViewBehaviorOrchestrator } from "@microsoft/fast-element/utilities";
import { eventFocusOut, eventKeyDown, keyArrowLeft, keyArrowRight, keyEnd, keyHome, } from "@microsoft/fast-web-utilities";
import { DataGridRowTypes } from "./data-grid.options.js";
/**
 * A Data Grid Row Custom HTML Element.
 *
 * @fires row-focused - Fires a custom 'row-focused' event when focus is on an element (usually a cell or its contents) in the row
 * @slot - The default slot for custom cell elements
 * @public
 */
export class FASTDataGridRow extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The type of row
         *
         * @public
         * @remarks
         * HTML Attribute: row-type
         */
        this.rowType = DataGridRowTypes.default;
        /**
         * The base data for this row
         *
         * @public
         */
        this.rowData = null;
        /**
         * The column definitions of the row
         *
         * @public
         */
        this.columnDefinitions = null;
        /**
         * Whether focus is on/in a cell within this row.
         *
         * @internal
         */
        this.isActiveRow = false;
        this.behaviorOrchestrator = null;
        /**
         * @internal
         */
        this.focusColumnIndex = 0;
        this.refocusOnLoad = false;
        this.updateRowStyle = () => {
            this.style.gridTemplateColumns = this.gridTemplateColumns;
        };
    }
    gridTemplateColumnsChanged() {
        if (this.$fastController.isConnected) {
            this.updateRowStyle();
        }
    }
    rowTypeChanged() {
        if (this.$fastController.isConnected) {
            this.updateItemTemplate();
        }
    }
    rowDataChanged() {
        if (this.rowData !== null && this.isActiveRow) {
            this.refocusOnLoad = true;
            return;
        }
    }
    cellItemTemplateChanged() {
        this.updateItemTemplate();
    }
    headerCellItemTemplateChanged() {
        this.updateItemTemplate();
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        // note that row elements can be reused with a different data object
        // as the parent grid's repeat behavior reacts to changes in the data set.
        if (this.behaviorOrchestrator === null) {
            this.updateItemTemplate();
            this.behaviorOrchestrator = ViewBehaviorOrchestrator.create(this);
            this.$fastController.addBehavior(this.behaviorOrchestrator);
            this.behaviorOrchestrator.addBehaviorFactory(new RepeatDirective(bind(x => x.columnDefinitions), bind(x => x.activeCellItemTemplate), { positioning: true }), this.appendChild(document.createComment("")));
        }
        this.addEventListener("cell-focused", this.handleCellFocus);
        this.addEventListener(eventFocusOut, this.handleFocusout);
        this.addEventListener(eventKeyDown, this.handleKeydown);
        this.updateRowStyle();
        if (this.refocusOnLoad) {
            // if focus was on the row when data changed try to refocus on same cell
            this.refocusOnLoad = false;
            if (this.cellElements.length > this.focusColumnIndex) {
                this.cellElements[this.focusColumnIndex].focus();
            }
        }
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("cell-focused", this.handleCellFocus);
        this.removeEventListener(eventFocusOut, this.handleFocusout);
        this.removeEventListener(eventKeyDown, this.handleKeydown);
    }
    handleFocusout(e) {
        if (!this.contains(e.target)) {
            this.isActiveRow = false;
            this.focusColumnIndex = 0;
        }
    }
    handleCellFocus(e) {
        this.isActiveRow = true;
        this.focusColumnIndex = this.cellElements.indexOf(e.target);
        this.$emit("row-focused", this);
    }
    handleKeydown(e) {
        if (e.defaultPrevented) {
            return;
        }
        let newFocusColumnIndex = 0;
        switch (e.key) {
            case keyArrowLeft:
                // focus left one cell
                newFocusColumnIndex = Math.max(0, this.focusColumnIndex - 1);
                this.cellElements[newFocusColumnIndex].focus();
                e.preventDefault();
                break;
            case keyArrowRight:
                // focus right one cell
                newFocusColumnIndex = Math.min(this.cellElements.length - 1, this.focusColumnIndex + 1);
                this.cellElements[newFocusColumnIndex].focus();
                e.preventDefault();
                break;
            case keyHome:
                if (!e.ctrlKey) {
                    this.cellElements[0].focus();
                    e.preventDefault();
                }
                break;
            case keyEnd:
                if (!e.ctrlKey) {
                    // focus last cell of the row
                    this.cellElements[this.cellElements.length - 1].focus();
                    e.preventDefault();
                }
                break;
        }
    }
    updateItemTemplate() {
        this.activeCellItemTemplate =
            this.rowType === DataGridRowTypes.default &&
                this.cellItemTemplate !== undefined
                ? this.cellItemTemplate
                : this.rowType === DataGridRowTypes.default &&
                    this.cellItemTemplate === undefined
                    ? this.defaultCellItemTemplate
                    : this.headerCellItemTemplate !== undefined
                        ? this.headerCellItemTemplate
                        : this.defaultHeaderCellItemTemplate;
    }
}
__decorate([
    attr({ attribute: "grid-template-columns" })
], FASTDataGridRow.prototype, "gridTemplateColumns", void 0);
__decorate([
    attr({ attribute: "row-type" })
], FASTDataGridRow.prototype, "rowType", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "rowData", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "columnDefinitions", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "cellItemTemplate", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "headerCellItemTemplate", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "rowIndex", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "isActiveRow", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "activeCellItemTemplate", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "defaultCellItemTemplate", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "defaultHeaderCellItemTemplate", void 0);
__decorate([
    observable
], FASTDataGridRow.prototype, "cellElements", void 0);
