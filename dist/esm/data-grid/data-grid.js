import { __decorate } from "tslib";
import { attr, bind, FASTElement, nullableNumberConverter, observable, RepeatDirective, Updates, } from "@microsoft/fast-element";
import { ViewBehaviorOrchestrator } from "@microsoft/fast-element/utilities";
import { eventFocus, eventFocusOut, eventKeyDown, keyArrowDown, keyArrowUp, keyEnd, keyHome, keyPageDown, keyPageUp, } from "@microsoft/fast-web-utilities";
import { DataGridRowTypes, GenerateHeaderOptions } from "./data-grid.options.js";
export { DataGridRowTypes, GenerateHeaderOptions };
/**
 * A Data Grid Custom HTML Element.
 *
 * @slot - The default slot for custom row elements
 * @public
 */
export class FASTDataGrid extends FASTElement {
    /**
     *  generates a gridTemplateColumns based on columndata array
     */
    static generateTemplateColumns(columnDefinitions) {
        let templateColumns = "";
        columnDefinitions.forEach((column) => {
            templateColumns = `${templateColumns}${templateColumns === "" ? "" : " "}${"1fr"}`;
        });
        return templateColumns;
    }
    noTabbingChanged() {
        if (this.$fastController.isConnected) {
            if (this.noTabbing) {
                this.setAttribute("tabIndex", "-1");
            }
            else {
                this.setAttribute("tabIndex", this.contains(document.activeElement) ||
                    this === document.activeElement
                    ? "-1"
                    : "0");
            }
        }
    }
    generateHeaderChanged() {
        if (this.$fastController.isConnected) {
            this.toggleGeneratedHeader();
        }
    }
    gridTemplateColumnsChanged() {
        if (this.$fastController.isConnected) {
            this.updateRowIndexes();
        }
    }
    rowsDataChanged() {
        if (this.columnDefinitions === null && this.rowsData.length > 0) {
            this.columnDefinitions = FASTDataGrid.generateColumns(this.rowsData[0]);
        }
        if (this.$fastController.isConnected) {
            this.toggleGeneratedHeader();
        }
    }
    columnDefinitionsChanged() {
        if (this.columnDefinitions === null) {
            this.generatedGridTemplateColumns = "";
            return;
        }
        this.generatedGridTemplateColumns = FASTDataGrid.generateTemplateColumns(this.columnDefinitions);
        if (this.$fastController.isConnected) {
            this.columnDefinitionsStale = true;
            this.queueRowIndexUpdate();
        }
    }
    headerCellItemTemplateChanged() {
        if (this.$fastController.isConnected) {
            if (this.generatedHeader !== null) {
                this.generatedHeader.headerCellItemTemplate = this.headerCellItemTemplate;
            }
        }
    }
    focusRowIndexChanged() {
        if (this.$fastController.isConnected) {
            this.queueFocusUpdate();
        }
    }
    focusColumnIndexChanged() {
        if (this.$fastController.isConnected) {
            this.queueFocusUpdate();
        }
    }
    constructor() {
        super();
        /**
         * When true the component will not add itself to the tab queue.
         * Default is false.
         *
         * @public
         * @remarks
         * HTML Attribute: no-tabbing
         */
        this.noTabbing = false;
        /**
         *  Whether the grid should automatically generate a header row and its type
         *
         * @public
         * @remarks
         * HTML Attribute: generate-header
         */
        this.generateHeader = GenerateHeaderOptions.default;
        /**
         * The data being displayed in the grid
         *
         * @public
         */
        this.rowsData = [];
        /**
         * The column definitions of the grid
         *
         * @public
         */
        this.columnDefinitions = null;
        /**
         * The index of the row that will receive focus the next time the
         * grid is focused. This value changes as focus moves to different
         * rows within the grid.  Changing this value when focus is already
         * within the grid moves focus to the specified row.
         *
         * @public
         */
        this.focusRowIndex = 0;
        /**
         * The index of the column that will receive focus the next time the
         * grid is focused. This value changes as focus moves to different rows
         * within the grid.  Changing this value when focus is already within
         * the grid moves focus to the specified column.
         *
         * @public
         */
        this.focusColumnIndex = 0;
        this.rowsPlaceholder = null;
        this.behaviorOrchestrator = null;
        this.generatedHeader = null;
        this.isUpdatingFocus = false;
        this.pendingFocusUpdate = false;
        this.rowindexUpdateQueued = false;
        this.columnDefinitionsStale = true;
        this.generatedGridTemplateColumns = "";
        this.focusOnCell = (rowIndex, columnIndex, alignment) => {
            if (this.rowElements.length === 0) {
                this.focusRowIndex = 0;
                this.focusColumnIndex = 0;
                return;
            }
            const focusRowIndex = Math.max(0, Math.min(this.rowElements.length - 1, rowIndex));
            const focusRow = this.rowElements[focusRowIndex];
            const cells = focusRow.querySelectorAll('[role="cell"], [role="gridcell"], [role="columnheader"], [role="rowheader"]');
            const focusColumnIndex = Math.max(0, Math.min(cells.length - 1, columnIndex));
            const focusTarget = cells[focusColumnIndex];
            focusTarget.scrollIntoView({ block: alignment });
            focusTarget.focus();
        };
        this.onChildListChange = (mutations, 
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        observer) => {
            if (mutations && mutations.length) {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((newNode) => {
                        if (newNode.nodeType === 1 &&
                            newNode.getAttribute("role") === "row") {
                            newNode.columnDefinitions = this.columnDefinitions;
                        }
                    });
                });
                this.queueRowIndexUpdate();
            }
        };
        this.queueRowIndexUpdate = () => {
            if (!this.rowindexUpdateQueued) {
                this.rowindexUpdateQueued = true;
                Updates.enqueue(this.updateRowIndexes);
            }
        };
        this.updateRowIndexes = () => {
            let newGridTemplateColumns = this.gridTemplateColumns;
            if (newGridTemplateColumns === undefined) {
                // try to generate columns based on manual rows
                if (this.generatedGridTemplateColumns === "" && this.rowElements.length > 0) {
                    const firstRow = this.rowElements[0];
                    this.generatedGridTemplateColumns = new Array(firstRow.cellElements.length)
                        .fill("1fr")
                        .join(" ");
                }
                newGridTemplateColumns = this.generatedGridTemplateColumns;
            }
            this.rowElements.forEach((element, index) => {
                const thisRow = element;
                thisRow.rowIndex = index;
                thisRow.gridTemplateColumns = newGridTemplateColumns;
                if (this.columnDefinitionsStale) {
                    thisRow.columnDefinitions = this.columnDefinitions;
                }
            });
            this.rowindexUpdateQueued = false;
            this.columnDefinitionsStale = false;
        };
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        if (this.rowItemTemplate === undefined) {
            this.rowItemTemplate = this.defaultRowItemTemplate;
        }
        if (this.behaviorOrchestrator === null) {
            this.behaviorOrchestrator = ViewBehaviorOrchestrator.create(this);
            this.$fastController.addBehavior(this.behaviorOrchestrator);
            this.behaviorOrchestrator.addBehaviorFactory(new RepeatDirective(bind(x => x.rowsData), bind(x => x.rowItemTemplate), { positioning: true }), this.appendChild((this.rowsPlaceholder = document.createComment(""))));
        }
        this.toggleGeneratedHeader();
        this.addEventListener("row-focused", this.handleRowFocus);
        this.addEventListener(eventFocus, this.handleFocus);
        this.addEventListener(eventKeyDown, this.handleKeydown);
        this.addEventListener(eventFocusOut, this.handleFocusOut);
        this.observer = new MutationObserver(this.onChildListChange);
        // only observe if nodes are added or removed
        this.observer.observe(this, { childList: true });
        if (this.noTabbing) {
            this.setAttribute("tabindex", "-1");
        }
        Updates.enqueue(this.queueRowIndexUpdate);
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("row-focused", this.handleRowFocus);
        this.removeEventListener(eventFocus, this.handleFocus);
        this.removeEventListener(eventKeyDown, this.handleKeydown);
        this.removeEventListener(eventFocusOut, this.handleFocusOut);
        this.observer.disconnect();
        if (this.generatedHeader !== null) {
            this.removeChild(this.generatedHeader);
            this.generatedHeader = null;
        }
    }
    /**
     * @internal
     */
    handleRowFocus(e) {
        this.isUpdatingFocus = true;
        const focusRow = e.target;
        this.focusRowIndex = this.rowElements.indexOf(focusRow);
        this.focusColumnIndex = focusRow.focusColumnIndex;
        this.setAttribute("tabIndex", "-1");
        this.isUpdatingFocus = false;
    }
    /**
     * @internal
     */
    handleFocus(e) {
        this.focusOnCell(this.focusRowIndex, this.focusColumnIndex, "nearest");
    }
    /**
     * @internal
     */
    handleFocusOut(e) {
        if (e.relatedTarget === null || !this.contains(e.relatedTarget)) {
            this.setAttribute("tabIndex", this.noTabbing ? "-1" : "0");
        }
    }
    /**
     * @internal
     */
    handleKeydown(e) {
        if (e.defaultPrevented) {
            return;
        }
        let newFocusRowIndex;
        switch (e.key) {
            case keyArrowUp:
                e.preventDefault();
                // focus up one row
                this.focusOnCell(this.focusRowIndex - 1, this.focusColumnIndex, "nearest");
                break;
            case keyArrowDown:
                e.preventDefault();
                // focus down one row
                this.focusOnCell(this.focusRowIndex + 1, this.focusColumnIndex, "nearest");
                break;
            case keyPageUp:
                e.preventDefault();
                if (this.rowElements.length === 0) {
                    this.focusOnCell(0, 0, "nearest");
                    break;
                }
                newFocusRowIndex = Math.max(0, this.focusRowIndex - this.getPageSize());
                this.focusOnCell(newFocusRowIndex, this.focusColumnIndex, "start");
                break;
            case keyPageDown:
                e.preventDefault();
                if (this.rowElements.length === 0) {
                    this.focusOnCell(0, 0, "nearest");
                    break;
                }
                newFocusRowIndex = Math.min(this.rowElements.length - 1, this.focusRowIndex + this.getPageSize());
                this.focusOnCell(newFocusRowIndex, this.focusColumnIndex, "end");
                break;
            case keyHome:
                if (e.ctrlKey) {
                    e.preventDefault();
                    // focus first cell of first row
                    this.focusOnCell(0, 0, "nearest");
                }
                break;
            case keyEnd:
                if (e.ctrlKey && this.columnDefinitions !== null) {
                    e.preventDefault();
                    // focus last cell of last row
                    this.focusOnCell(this.rowElements.length - 1, this.columnDefinitions.length - 1, "nearest");
                }
                break;
        }
    }
    getPageSize() {
        if (this.pageSize) {
            return this.pageSize;
        }
        let rowHeight = 50;
        this.rowElements.forEach(element => {
            var _a;
            if (!element.hasAttribute("rowType") ||
                !((_a = element.getAttribute("rowType")) === null || _a === void 0 ? void 0 : _a.includes("header"))) {
                rowHeight = element.clientHeight;
            }
        });
        let pageSize = 1;
        if (rowHeight === 0) {
            return pageSize;
        }
        if (this.clientHeight < this.scrollHeight) {
            pageSize = this.clientHeight / rowHeight;
        }
        else {
            pageSize = document.body.clientHeight / rowHeight;
        }
        pageSize = Math.max(Math.round(pageSize), 1);
        return pageSize;
    }
    queueFocusUpdate() {
        if (this.isUpdatingFocus &&
            (this.contains(document.activeElement) || this === document.activeElement)) {
            return;
        }
        if (this.pendingFocusUpdate === false) {
            this.pendingFocusUpdate = true;
            Updates.enqueue(() => this.updateFocus());
        }
    }
    updateFocus() {
        this.pendingFocusUpdate = false;
        this.focusOnCell(this.focusRowIndex, this.focusColumnIndex, "nearest");
    }
    toggleGeneratedHeader() {
        if (this.generatedHeader !== null) {
            this.removeChild(this.generatedHeader);
            this.generatedHeader = null;
        }
        if (this.generateHeader !== GenerateHeaderOptions.none &&
            this.rowsData.length > 0) {
            const generatedHeaderElement = document.createElement(this.rowElementTag);
            this.generatedHeader = generatedHeaderElement;
            this.generatedHeader.columnDefinitions = this.columnDefinitions;
            this.generatedHeader.gridTemplateColumns = this.gridTemplateColumns;
            this.generatedHeader.rowType =
                this.generateHeader === GenerateHeaderOptions.sticky
                    ? DataGridRowTypes.stickyHeader
                    : DataGridRowTypes.header;
            if (this.firstChild !== null || this.rowsPlaceholder !== null) {
                this.insertBefore(generatedHeaderElement, this.firstChild !== null ? this.firstChild : this.rowsPlaceholder);
            }
            return;
        }
    }
}
/**
 *  generates a basic column definition by examining sample row data
 */
FASTDataGrid.generateColumns = (row) => {
    return Object.getOwnPropertyNames(row).map((property, index) => {
        return {
            columnDataKey: property,
            gridColumn: `${index}`,
        };
    });
};
__decorate([
    attr({ attribute: "no-tabbing", mode: "boolean" })
], FASTDataGrid.prototype, "noTabbing", void 0);
__decorate([
    attr({ attribute: "generate-header" })
], FASTDataGrid.prototype, "generateHeader", void 0);
__decorate([
    attr({ attribute: "grid-template-columns" })
], FASTDataGrid.prototype, "gridTemplateColumns", void 0);
__decorate([
    attr({ attribute: "page-size", converter: nullableNumberConverter })
], FASTDataGrid.prototype, "pageSize", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "rowsData", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "columnDefinitions", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "rowItemTemplate", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "cellItemTemplate", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "headerCellItemTemplate", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "focusRowIndex", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "focusColumnIndex", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "defaultRowItemTemplate", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "rowElementTag", void 0);
__decorate([
    observable
], FASTDataGrid.prototype, "rowElements", void 0);
