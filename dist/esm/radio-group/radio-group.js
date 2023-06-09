import { __decorate } from "tslib";
import { attr, FASTElement, observable } from "@microsoft/fast-element";
import { ArrowKeys, Direction, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp, keyEnter, } from "@microsoft/fast-web-utilities";
import { FASTRadio } from "../radio/index.js";
import { getDirection } from "../utilities/direction.js";
import { RadioGroupOrientation } from "./radio-group.options.js";
/**
 * An Radio Group Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radiogroup | ARIA radiogroup }.
 *
 * @slot label - The slot for the label
 * @slot - The default slot for radio buttons
 * @csspart positioning-region - The positioning region for laying out the radios
 * @fires change - Fires a custom 'change' event when the value changes
 *
 * @public
 */
export class FASTRadioGroup extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The orientation of the group
         *
         * @public
         * @remarks
         * HTML Attribute: orientation
         */
        this.orientation = RadioGroupOrientation.horizontal;
        this.radioChangeHandler = (e) => {
            const changedRadio = e.target;
            if (changedRadio.checked) {
                this.slottedRadioButtons.forEach((radio) => {
                    if (radio !== changedRadio) {
                        radio.checked = false;
                        if (!this.isInsideFoundationToolbar) {
                            radio.setAttribute("tabindex", "-1");
                        }
                    }
                });
                this.selectedRadio = changedRadio;
                this.value = changedRadio.value;
                changedRadio.setAttribute("tabindex", "0");
                this.focusedRadio = changedRadio;
            }
            e.stopPropagation();
        };
        this.moveToRadioByIndex = (group, index) => {
            const radio = group[index];
            if (!this.isInsideToolbar) {
                radio.setAttribute("tabindex", "0");
                if (radio.readOnly) {
                    this.slottedRadioButtons.forEach((nextRadio) => {
                        if (nextRadio !== radio) {
                            nextRadio.setAttribute("tabindex", "-1");
                        }
                    });
                }
                else {
                    radio.checked = true;
                    this.selectedRadio = radio;
                }
            }
            this.focusedRadio = radio;
            radio.focus();
        };
        this.moveRightOffGroup = () => {
            var _a;
            (_a = this.nextElementSibling) === null || _a === void 0 ? void 0 : _a.focus();
        };
        this.moveLeftOffGroup = () => {
            var _a;
            (_a = this.previousElementSibling) === null || _a === void 0 ? void 0 : _a.focus();
        };
        /**
         * @internal
         */
        this.focusOutHandler = (e) => {
            const group = this.slottedRadioButtons;
            const radio = e.target;
            const index = radio !== null ? group.indexOf(radio) : 0;
            const focusedIndex = this.focusedRadio
                ? group.indexOf(this.focusedRadio)
                : -1;
            if ((focusedIndex === 0 && index === focusedIndex) ||
                (focusedIndex === group.length - 1 && focusedIndex === index)) {
                if (!this.selectedRadio) {
                    this.focusedRadio = group[0];
                    this.focusedRadio.setAttribute("tabindex", "0");
                    group.forEach((nextRadio) => {
                        if (nextRadio !== this.focusedRadio) {
                            nextRadio.setAttribute("tabindex", "-1");
                        }
                    });
                }
                else {
                    this.focusedRadio = this.selectedRadio;
                    if (!this.isInsideFoundationToolbar) {
                        this.selectedRadio.setAttribute("tabindex", "0");
                        group.forEach((nextRadio) => {
                            if (nextRadio !== this.selectedRadio) {
                                nextRadio.setAttribute("tabindex", "-1");
                            }
                        });
                    }
                }
            }
            return true;
        };
        /**
         * @internal
         */
        this.handleDisabledClick = (e) => {
            // prevent focus events on items from the click handler when disabled
            if (this.disabled) {
                e.preventDefault();
                return;
            }
            return true;
        };
        /**
         * @internal
         */
        this.clickHandler = (e) => {
            if (this.disabled) {
                return;
            }
            e.preventDefault();
            const radio = e.target;
            if (radio && radio instanceof FASTRadio) {
                radio.checked = true;
                radio.setAttribute("tabindex", "0");
                this.selectedRadio = radio;
                this.focusedRadio = radio;
            }
        };
        this.shouldMoveOffGroupToTheRight = (index, group, key) => {
            return index === group.length && this.isInsideToolbar && key === keyArrowRight;
        };
        this.shouldMoveOffGroupToTheLeft = (group, key) => {
            const index = this.focusedRadio ? group.indexOf(this.focusedRadio) - 1 : 0;
            return index < 0 && this.isInsideToolbar && key === keyArrowLeft;
        };
        this.checkFocusedRadio = () => {
            if (this.focusedRadio !== null &&
                !this.focusedRadio.readOnly &&
                !this.focusedRadio.checked) {
                this.focusedRadio.checked = true;
                this.focusedRadio.setAttribute("tabindex", "0");
                this.focusedRadio.focus();
                this.selectedRadio = this.focusedRadio;
            }
        };
        this.moveRight = (e) => {
            const group = this.slottedRadioButtons;
            let index = 0;
            index = this.focusedRadio ? group.indexOf(this.focusedRadio) + 1 : 1;
            if (this.shouldMoveOffGroupToTheRight(index, group, e.key)) {
                this.moveRightOffGroup();
                return;
            }
            else if (index === group.length) {
                index = 0;
            }
            /* looping to get to next radio that is not disabled */
            /* matching native radio/radiogroup which does not select an item if there is only 1 in the group */
            while (index < group.length && group.length > 1) {
                if (!group[index].disabled) {
                    this.moveToRadioByIndex(group, index);
                    break;
                }
                else if (this.focusedRadio && index === group.indexOf(this.focusedRadio)) {
                    break;
                }
                else if (index + 1 >= group.length) {
                    if (this.isInsideToolbar) {
                        break;
                    }
                    else {
                        index = 0;
                    }
                }
                else {
                    index += 1;
                }
            }
        };
        this.moveLeft = (e) => {
            const group = this.slottedRadioButtons;
            let index = 0;
            index = this.focusedRadio ? group.indexOf(this.focusedRadio) - 1 : 0;
            index = index < 0 ? group.length - 1 : index;
            if (this.shouldMoveOffGroupToTheLeft(group, e.key)) {
                this.moveLeftOffGroup();
                return;
            }
            /* looping to get to next radio that is not disabled */
            while (index >= 0 && group.length > 1) {
                if (!group[index].disabled) {
                    this.moveToRadioByIndex(group, index);
                    break;
                }
                else if (this.focusedRadio && index === group.indexOf(this.focusedRadio)) {
                    break;
                }
                else if (index - 1 < 0) {
                    index = group.length - 1;
                }
                else {
                    index -= 1;
                }
            }
        };
        /**
         * keyboard handling per https://w3c.github.io/aria-practices/#for-radio-groups-not-contained-in-a-toolbar
         * navigation is different when there is an ancestor with role='toolbar'
         *
         * @internal
         */
        this.keydownHandler = (e) => {
            const key = e.key;
            if (key in ArrowKeys && (this.isInsideFoundationToolbar || this.disabled)) {
                return true;
            }
            switch (key) {
                case keyEnter: {
                    this.checkFocusedRadio();
                    break;
                }
                case keyArrowRight:
                case keyArrowDown: {
                    if (this.direction === Direction.ltr) {
                        this.moveRight(e);
                    }
                    else {
                        this.moveLeft(e);
                    }
                    break;
                }
                case keyArrowLeft:
                case keyArrowUp: {
                    if (this.direction === Direction.ltr) {
                        this.moveLeft(e);
                    }
                    else {
                        this.moveRight(e);
                    }
                    break;
                }
                default: {
                    return true;
                }
            }
        };
    }
    readOnlyChanged() {
        if (this.slottedRadioButtons !== undefined) {
            this.slottedRadioButtons.forEach((radio) => {
                if (this.readOnly) {
                    radio.readOnly = true;
                }
                else {
                    radio.readOnly = false;
                }
            });
        }
    }
    disabledChanged() { }
    nameChanged() {
        if (this.slottedRadioButtons) {
            this.slottedRadioButtons.forEach((radio) => {
                radio.setAttribute("name", this.name);
            });
        }
    }
    valueChanged() {
        if (this.slottedRadioButtons) {
            this.slottedRadioButtons.forEach((radio) => {
                if (radio.value === this.value) {
                    radio.checked = true;
                    this.selectedRadio = radio;
                }
            });
        }
        this.$emit("change");
    }
    slottedRadioButtonsChanged(oldValue, newValue) {
        if (this.slottedRadioButtons && this.slottedRadioButtons.length > 0) {
            this.setupRadioButtons();
        }
    }
    get parentToolbar() {
        return this.closest('[role="toolbar"]');
    }
    get isInsideToolbar() {
        var _a;
        return ((_a = this.parentToolbar) !== null && _a !== void 0 ? _a : false);
    }
    get isInsideFoundationToolbar() {
        var _a;
        return !!((_a = this.parentToolbar) === null || _a === void 0 ? void 0 : _a["$fastController"]);
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.direction = getDirection(this);
        this.setupRadioButtons();
    }
    disconnectedCallback() {
        this.slottedRadioButtons.forEach((radio) => {
            radio.removeEventListener("change", this.radioChangeHandler);
        });
    }
    setupRadioButtons() {
        const checkedRadios = this.slottedRadioButtons.filter((radio) => {
            return radio.hasAttribute("checked");
        });
        const numberOfCheckedRadios = checkedRadios ? checkedRadios.length : 0;
        if (numberOfCheckedRadios > 1) {
            const lastCheckedRadio = checkedRadios[numberOfCheckedRadios - 1];
            lastCheckedRadio.checked = true;
        }
        let foundMatchingVal = false;
        this.slottedRadioButtons.forEach((radio) => {
            if (this.name !== undefined) {
                radio.setAttribute("name", this.name);
            }
            if (this.readOnly) {
                radio.readOnly = true;
            }
            if (this.value && this.value === radio.value) {
                this.selectedRadio = radio;
                this.focusedRadio = radio;
                radio.checked = true;
                radio.setAttribute("tabindex", "0");
                foundMatchingVal = true;
            }
            else {
                if (!this.isInsideFoundationToolbar) {
                    radio.setAttribute("tabindex", "-1");
                }
                radio.checked = false;
            }
            radio.addEventListener("change", this.radioChangeHandler);
        });
        if (this.value === undefined && this.slottedRadioButtons.length > 0) {
            const checkedRadios = this.slottedRadioButtons.filter((radio) => {
                return radio.hasAttribute("checked");
            });
            const numberOfCheckedRadios = checkedRadios !== null ? checkedRadios.length : 0;
            if (numberOfCheckedRadios > 0 && !foundMatchingVal) {
                const lastCheckedRadio = checkedRadios[numberOfCheckedRadios - 1];
                lastCheckedRadio.checked = true;
                this.focusedRadio = lastCheckedRadio;
                lastCheckedRadio.setAttribute("tabindex", "0");
            }
            else {
                this.slottedRadioButtons[0].setAttribute("tabindex", "0");
                this.focusedRadio = this.slottedRadioButtons[0];
            }
        }
    }
}
__decorate([
    attr({ attribute: "readonly", mode: "boolean" })
], FASTRadioGroup.prototype, "readOnly", void 0);
__decorate([
    attr({ attribute: "disabled", mode: "boolean" })
], FASTRadioGroup.prototype, "disabled", void 0);
__decorate([
    attr
], FASTRadioGroup.prototype, "name", void 0);
__decorate([
    attr
], FASTRadioGroup.prototype, "value", void 0);
__decorate([
    attr
], FASTRadioGroup.prototype, "orientation", void 0);
__decorate([
    observable
], FASTRadioGroup.prototype, "childItems", void 0);
__decorate([
    observable
], FASTRadioGroup.prototype, "slottedRadioButtons", void 0);
