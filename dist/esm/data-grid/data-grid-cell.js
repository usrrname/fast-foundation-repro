import { __decorate } from "tslib";
import { attr, FASTElement, html, observable } from "@microsoft/fast-element";
import { eventFocusIn, eventFocusOut, eventKeyDown, keyEnter, keyEscape, keyFunction2, } from "@microsoft/fast-web-utilities";
import { DataGridCellTypes } from "./data-grid.options.js";
export { DataGridCellTypes };
const defaultCellContentsTemplate = html `
    <template>
        ${x => x.rowData === null ||
    x.columnDefinition === null ||
    x.columnDefinition.columnDataKey === null
    ? null
    : x.rowData[x.columnDefinition.columnDataKey]}
    </template>
`;
const defaultHeaderCellContentsTemplate = html `
    <template>
        ${x => x.columnDefinition === null
    ? null
    : x.columnDefinition.title === undefined
        ? x.columnDefinition.columnDataKey
        : x.columnDefinition.title}
    </template>
`;
/**
 * A Data Grid Cell Custom HTML Element.
 *
 * @fires cell-focused - Fires a custom 'cell-focused' event when focus is on the cell or its contents
 * @slot - The default slot for cell contents.  The "cell contents template" renders here.
 * @public
 */
export class FASTDataGridCell extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The type of cell
         *
         * @public
         * @remarks
         * HTML Attribute: cell-type
         */
        this.cellType = DataGridCellTypes.default;
        /**
         * The base data for the parent row
         *
         * @public
         */
        this.rowData = null;
        /**
         * The base data for the column
         *
         * @public
         */
        this.columnDefinition = null;
        this.isActiveCell = false;
        this.customCellView = null;
        this.updateCellStyle = () => {
            this.style.gridColumn = this.gridColumn;
        };
    }
    cellTypeChanged() {
        if (this.$fastController.isConnected) {
            this.updateCellView();
        }
    }
    gridColumnChanged() {
        if (this.$fastController.isConnected) {
            this.updateCellStyle();
        }
    }
    columnDefinitionChanged(oldValue, newValue) {
        if (this.$fastController.isConnected) {
            this.updateCellView();
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        var _a;
        super.connectedCallback();
        this.addEventListener(eventFocusIn, this.handleFocusin);
        this.addEventListener(eventFocusOut, this.handleFocusout);
        this.addEventListener(eventKeyDown, this.handleKeydown);
        this.style.gridColumn = `${((_a = this.columnDefinition) === null || _a === void 0 ? void 0 : _a.gridColumn) === undefined
            ? 0
            : this.columnDefinition.gridColumn}`;
        this.updateCellView();
        this.updateCellStyle();
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(eventFocusIn, this.handleFocusin);
        this.removeEventListener(eventFocusOut, this.handleFocusout);
        this.removeEventListener(eventKeyDown, this.handleKeydown);
        this.disconnectCellView();
    }
    handleFocusin(e) {
        if (this.isActiveCell) {
            return;
        }
        this.isActiveCell = true;
        switch (this.cellType) {
            case DataGridCellTypes.columnHeader:
                if (this.columnDefinition !== null &&
                    this.columnDefinition.headerCellInternalFocusQueue !== true &&
                    typeof this.columnDefinition.headerCellFocusTargetCallback ===
                        "function") {
                    // move focus to the focus target
                    const focusTarget = this.columnDefinition.headerCellFocusTargetCallback(this);
                    if (focusTarget !== null) {
                        focusTarget.focus();
                    }
                }
                break;
            default:
                if (this.columnDefinition !== null &&
                    this.columnDefinition.cellInternalFocusQueue !== true &&
                    typeof this.columnDefinition.cellFocusTargetCallback === "function") {
                    // move focus to the focus target
                    const focusTarget = this.columnDefinition.cellFocusTargetCallback(this);
                    if (focusTarget !== null) {
                        focusTarget.focus();
                    }
                }
                break;
        }
        this.$emit("cell-focused", this);
    }
    handleFocusout(e) {
        if (this !== document.activeElement && !this.contains(document.activeElement)) {
            this.isActiveCell = false;
        }
    }
    handleKeydown(e) {
        if (e.defaultPrevented ||
            this.columnDefinition === null ||
            (this.cellType === DataGridCellTypes.default &&
                this.columnDefinition.cellInternalFocusQueue !== true) ||
            (this.cellType === DataGridCellTypes.columnHeader &&
                this.columnDefinition.headerCellInternalFocusQueue !== true)) {
            return;
        }
        switch (e.key) {
            case keyEnter:
            case keyFunction2:
                if (this.contains(document.activeElement) &&
                    document.activeElement !== this) {
                    return;
                }
                switch (this.cellType) {
                    case DataGridCellTypes.columnHeader:
                        if (this.columnDefinition.headerCellFocusTargetCallback !==
                            undefined) {
                            const focusTarget = this.columnDefinition.headerCellFocusTargetCallback(this);
                            if (focusTarget !== null) {
                                focusTarget.focus();
                            }
                            e.preventDefault();
                        }
                        break;
                    default:
                        if (this.columnDefinition.cellFocusTargetCallback !== undefined) {
                            const focusTarget = this.columnDefinition.cellFocusTargetCallback(this);
                            if (focusTarget !== null) {
                                focusTarget.focus();
                            }
                            e.preventDefault();
                        }
                        break;
                }
                break;
            case keyEscape:
                if (this.contains(document.activeElement) &&
                    document.activeElement !== this) {
                    this.focus();
                    e.preventDefault();
                }
                break;
        }
    }
    updateCellView() {
        var _a, _b;
        this.disconnectCellView();
        if (this.columnDefinition === null) {
            return;
        }
        switch (this.cellType) {
            case DataGridCellTypes.columnHeader:
                this.customCellView = html `
                    ${(_a = this.columnDefinition.headerCellTemplate) !== null && _a !== void 0 ? _a : defaultHeaderCellContentsTemplate}
                `.render(this, this);
                break;
            case undefined:
            case DataGridCellTypes.rowHeader:
            case DataGridCellTypes.default:
                this.customCellView = html `
                    ${(_b = this.columnDefinition.cellTemplate) !== null && _b !== void 0 ? _b : defaultCellContentsTemplate}
                `.render(this, this);
                break;
        }
    }
    disconnectCellView() {
        if (this.customCellView !== null) {
            this.customCellView.dispose();
            this.customCellView = null;
        }
    }
}
__decorate([
    attr({ attribute: "cell-type" })
], FASTDataGridCell.prototype, "cellType", void 0);
__decorate([
    attr({ attribute: "grid-column" })
], FASTDataGridCell.prototype, "gridColumn", void 0);
__decorate([
    observable
], FASTDataGridCell.prototype, "rowData", void 0);
__decorate([
    observable
], FASTDataGridCell.prototype, "columnDefinition", void 0);
