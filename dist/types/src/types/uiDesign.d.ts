import type { NamedColor, QAvatarProps, QBadgeProps, QBtnDropdownProps, QBtnProps, QCardActionsProps, QCardProps, QDateProps, QDialogProps, QFileProps, QFormProps, QHeaderProps, QIconProps, QImgProps, QInputProps, QItemLabelProps, QItemProps, QItemSectionProps, QListProps, QRouteTabProps, QSelectProps, QSpinnerProps, QTableProps, QTabsProps, QToggleProps, QToolbarProps, QToolbarTitleProps, VueClassProp, VueStyleObjectProp, VueStyleProp } from 'quasar';
/**
 * Represents a single primitive value in the UI configuration.
 */
export type UiDesignValue = string | number | boolean | NamedColor | VueStyleProp | VueClassProp | VueStyleObjectProp;
/**
 * Represents a namespace containing key-value pairs of UI configuration values.
 * Values can be primitives or nested namespaces.
 */
export interface UiDesignNamespace {
    [key: string]: UiDesignValue | UiDesignNamespace;
}
/**
 * Represents the full UI design configuration used across the application.
 * Contains multiple namespaces, including the `default` namespace used as a fallback.
 */
export interface UiDesign {
    /**
     * Default namespace providing fallback values for all components.
     */
    default?: UiDesignNamespace;
    /**
     * Arbitrary namespaces for component-specific overrides.
     */
    [namespace: string]: UiDesignNamespace | undefined;
}
/**
 * List of QBtnProps keys for type-safe UI design retrieval.
 */
declare const Q_BTN_PROPS: readonly ["icon", "iconRight", "noCaps", "noWrap", "align", "stack", "stretch", "size", "outline", "flat", "unelevated", "rounded", "push", "square", "glossy", "fab", "fabMini", "padding", "color", "textColor", "dense", "ripple", "round"];
/**
 * List of QTabsProps keys for type-safe UI design retrieval.
 */
declare const Q_TABS_PROPS: readonly ["vertical", "outsideArrows", "mobileArrows", "align", "breakpoint", "leftIcon", "rightIcon", "stretch", "shrink", "switchIndicator", "narrowIndicator", "inlineLabel", "noCaps", "activeColor", "activeBgColor", "indicatorColor", "contentClass", "activeClass", "dense"];
/**
 * List of QRouteTabProps keys for type-safe UI design retrieval.
 */
declare const Q_ROUTE_TAB_PROPS: readonly ["icon", "activeClass", "exactActiveClass", "noCaps", "alert", "contentClass", "ripple"];
/**
 * List of QHeaderProps keys for type-safe UI design retrieval.
 */
declare const Q_HEADER_PROPS: readonly ["reveal", "revealOffset", "elevated", "bordered"];
/**
 * List of QToolbarProps keys for type-safe UI design retrieval.
 */
declare const Q_TOOLBAR_PROPS: readonly ["inset"];
/**
 * List of QToolbarTitleProps keys for type-safe UI design retrieval.
 */
declare const Q_TOOLBAR_TITLE_PROPS: readonly ["shrink"];
/**
 * List of QAvatarProps keys for type-safe UI design retrieval.
 */
declare const Q_AVATAR_PROPS: readonly ["icon", "size", "fontSize", "color", "textColor", "square", "rounded"];
/**
 * List of QBadgeProps keys for type-safe UI design retrieval.
 */
declare const Q_BADGE_PROPS: readonly ["floating", "multiLine", "align", "color", "textColor", "transparent", "outline", "rounded"];
/**
 * List of QTableProps keys for type-safe UI design retrieval.
 */
declare const Q_TABLE_PROPS: readonly ["virtualScrollItemSize", "virtualScrollStickySizeStart", "virtualScrollStickySizeEnd", "color", "iconFirstPage", "iconPrevPage", "iconNextPage", "iconLastPage", "grid", "gridHeader", "dense", "hideHeader", "hideBottom", "hideSelectedBanner", "hideNoData", "hidePagination", "flat", "bordered", "square", "separator", "wrapCells", "tableStyle", "tableClass", "tableHeaderStyle", "tableHeaderClass", "cardContainerStyle", "cardContainerClass", "cardStyle", "cardClass", "titleClass"];
/**
 * List of QCardProps keys for type-safe UI design retrieval.
 */
declare const Q_CARD_PROPS: readonly ["dark", "square", "flat", "bordered"];
/**
 * List of QCardActionsProps keys for type-safe UI design retrieval.
 */
declare const Q_CARD_ACTIONS_PROPS: readonly ["align", "vertical"];
/**
 * List of QIconProps keys for type-safe UI design retrieval.
 */
declare const Q_ICON_PROPS: readonly ["left", "right", "name", "size", "color"];
/**
 * List of QToggleProps keys for type-safe UI design retrieval.
 */
declare const Q_TOGGLE_PROPS: readonly ["toggleOrder", "toggleIndeterminate", "keepColor", "icon", "checkedIcon", "uncheckedIcon", "indeterminateIcon", "leftLabel", "size", "color", "dark", "dense", "iconColor"];
/**
 * List of QInputProps keys for type-safe UI design retrieval.
 */
declare const Q_INPUT_PROPS: readonly ["autofocus", "stackLabel", "hideHint", "clearable", "clearIcon", "counter", "autogrow", "fillMask", "reverseFillMask", "unmaskedValue", "debounce", "labelColor", "color", "bgColor", "dark", "filled", "outlined", "borderless", "standout", "hideBottomSpace", "rounded", "square", "dense", "itemAligned", "noErrorIcon"];
/**
 * List of QDateProps keys for type-safe UI design retrieval.
 */
declare const Q_DATE_PROPS: readonly ["landscape", "yearsInMonthView", "todayBtn", "minimal", "defaultView", "color", "textColor", "dark", "square", "flat", "bordered"];
/**
 * List of QImgProps keys for type-safe UI design retrieval.
 */
declare const Q_IMG_PROPS: readonly ["loading", "loadingShowDelay", "noSpinner", "noNativeMenu", "noTransition", "draggable", "src", "srcset", "sizes", "placeholderSrc", "errorSrc", "ratio", "initialRatio", "width", "height", "fit", "position", "imgClass", "imgStyle", "spinnerColor", "spinnerSize"];
/**
 * List of QFileProps keys for type-safe UI design retrieval.
 */
declare const Q_FILE_PROPS: readonly ["autofocus", "stackLabel", "hideHint", "clearable", "clearIcon", "useChips", "labelColor", "color", "bgColor", "dark", "filled", "outlined", "borderless", "standout", "hideBottomSpace", "rounded", "square", "dense", "itemAligned", "inputClass", "inputStyle", "noErrorIcon"];
/**
 * List of QSelectProps keys for type-safe UI design retrieval.
 */
declare const Q_SELECT_PROPS: readonly ["virtualScrollHorizontal", "clearable", "autofocus", "hideDropdownIcon", "popupNoRouteDismiss", "fillInput", "transitionShow", "transitionHide", "transitionDuration", "behavior", "stackLabel", "hideHint", "clearIcon", "counter", "dropdownIcon", "useInput", "inputDebounce", "optionsDense", "optionsDark", "optionsSelectedClass", "optionsCover", "menuShrink", "disableTabSelection", "menuAnchor", "menuSelf", "menuOffset", "displayValueHtml", "hideSelected", "useChips", "labelColor", "color", "bgColor", "dark", "filled", "outlined", "borderless", "standout", "hideBottomSpace", "rounded", "square", "dense", "itemAligned", "popupContentClass", "popupContentStyle", "inputClass", "inputStyle", "noErrorIcon", "virtualScrollSliceSize", "virtualScrollSliceRatioBefore", "virtualScrollSliceRatioAfter", "virtualScrollItemSize", "virtualScrollStickySizeStart", "virtualScrollStickySizeEnd"];
/**
 * List of QDialogProps keys for type-safe UI design retrieval.
 */
declare const Q_DIALOG_PROPS: readonly ["persistent", "noEscDismiss", "noBackdropDismiss", "noRouteDismiss", "autoClose", "noRefocus", "noFocus", "noShake", "allowFocusOutside", "seamless", "maximized", "fullWidth", "fullHeight", "position", "backdropFilter", "square", "transitionShow", "transitionHide", "transitionDuration"];
/**
 * List of QSpinnerProps keys for type-safe UI design retrieval.
 */
declare const Q_SPINNER_PROPS: readonly ["size", "color", "thickness"];
/**
 * List of QBtnDropdownProps keys for type-safe UI design retrieval.
 */
declare const Q_BTN_DROPDOWN_PROPS: readonly ["split", "disableMainBtn", "disableDropdown", "persistent", "noEscDismiss", "noRouteDismiss", "autoClose", "noRefocus", "noFocus", "icon", "iconRight", "noCaps", "noWrap", "align", "stack", "stretch", "dropdownIcon", "cover", "menuAnchor", "menuSelf", "menuOffset", "size", "outline", "flat", "unelevated", "rounded", "push", "square", "glossy", "fab", "fabMini", "padding", "color", "textColor", "dense", "ripple", "noIconAnimation", "contentStyle", "contentClass", "transitionShow", "transitionHide", "transitionDuration"];
/**
 * List of QListProps keys for type-safe UI design retrieval.
 */
declare const Q_LIST_PROPS: readonly ["separator", "padding", "tag", "bordered", "dense", "dark"];
/**
 * List of QItemProps keys for type-safe UI design retrieval.
 */
declare const Q_ITEM_PROPS: readonly ["insetLevel", "tag", "activeClass", "exactActiveClass", "clickable", "manualFocus", "focused", "dark", "dense"];
/**
 * List of QItemSectionProps keys for type-safe UI design retrieval.
 */
declare const Q_ITEM_SECTION_PROPS: readonly ["avatar", "thumbnail", "side", "top", "noWrap"];
/**
 * List of QFormProps keys for type-safe UI design retrieval.
 */
declare const Q_FORM_PROPS: readonly ["autofocus", "noErrorFocus", "noResetFocus", "greedy"];
/**
 * List of QItemLabelProps keys for type-safe UI design retrieval.
 */
declare const Q_ITEM_LABEL_PROPS: readonly ["lines", "overline", "caption", "header"];
/**
 * Maps Quasar component names to their respective props keys for UI design retrieval.
 */
export declare const Q_COMPONENT_PROPS: Record<QComponentName, readonly string[]>;
/**
 * Subset of QBtn props supported in UI design configuration.
 */
export type LinidQBtnProps = Pick<QBtnProps, (typeof Q_BTN_PROPS)[number]>;
/**
 * Subset of QTabs props supported in UI design configuration.
 */
export type LinidQTabsProps = Pick<QTabsProps, (typeof Q_TABS_PROPS)[number]>;
/**
 * Subset of QRouteTab props supported in UI design configuration.
 */
export type LinidQRouteTabProps = Pick<QRouteTabProps, (typeof Q_ROUTE_TAB_PROPS)[number]>;
/**
 * Subset of QHeader props supported in UI design configuration.
 */
export type LinidQHeaderProps = Pick<QHeaderProps, (typeof Q_HEADER_PROPS)[number]>;
/**
 * Subset of QHeader props supported in UI design configuration.
 */
export type LinidQToolbarProps = Pick<QToolbarProps, (typeof Q_TOOLBAR_PROPS)[number]>;
/**
 * Subset of QToolbarTitle props supported in UI design configuration.
 */
export type LinidQToolbarTitleProps = Pick<QToolbarTitleProps, (typeof Q_TOOLBAR_TITLE_PROPS)[number]>;
/**
 * Subset of QAvatar props supported in UI design configuration.
 */
export type LinidQAvatarProps = Pick<QAvatarProps, (typeof Q_AVATAR_PROPS)[number]>;
/**
 * Subset of QBadge props supported in UI design configuration.
 */
export type LinidQBadgeProps = Pick<QBadgeProps, (typeof Q_BADGE_PROPS)[number]>;
/**
 * Subset of QTable props supported in UI design configuration.
 */
export type LinidQTableProps = Pick<QTableProps, (typeof Q_TABLE_PROPS)[number]>;
/**
 * Subset of QCard props supported in UI design configuration.
 */
export type LinidQCardProps = Pick<QCardProps, (typeof Q_CARD_PROPS)[number]>;
/**
 * Subset of QCardActions props supported in UI design configuration.
 */
export type LinidQCardActionsProps = Pick<QCardActionsProps, (typeof Q_CARD_ACTIONS_PROPS)[number]>;
/**
 * Subset of QIcon props supported in UI design configuration.
 */
export type LinidQIconProps = Pick<QIconProps, (typeof Q_ICON_PROPS)[number]>;
/**
 * Subset of QToggle props supported in UI design configuration.
 */
export type LinidQToggleProps = Pick<QToggleProps, (typeof Q_TOGGLE_PROPS)[number]>;
/**
 * Subset of QInput props supported in UI design configuration.
 */
export type LinidQInputProps = Pick<QInputProps, (typeof Q_INPUT_PROPS)[number]>;
/**
 * Subset of QInput props supported in UI design configuration.
 */
export type LinidQDateProps = Pick<QDateProps, (typeof Q_DATE_PROPS)[number]>;
/**
 * Subset of QImg props supported in UI design configuration.
 */
export type LinidQImgProps = Pick<QImgProps, (typeof Q_IMG_PROPS)[number]>;
/**
 * Subset of QFile props supported in UI design configuration.
 */
export type LinidQFileProps = Pick<QFileProps, (typeof Q_FILE_PROPS)[number]>;
/**
 * Subset of QForm props supported in UI design configuration.
 */
export type LinidQFormProps = Pick<QFormProps, (typeof Q_FORM_PROPS)[number]>;
/**
 * Subset of QSelect props supported in UI design configuration.
 */
export type LinidQSelectProps = Pick<QSelectProps, (typeof Q_SELECT_PROPS)[number]>;
/**
 * Subset of QDialog props supported in UI design configuration.
 */
export type LinidQDialogProps = Pick<QDialogProps, (typeof Q_DIALOG_PROPS)[number]>;
/**
 * Subset of QSpinner props supported in UI design configuration.
 */
export type LinidQSpinnerProps = Pick<QSpinnerProps, (typeof Q_SPINNER_PROPS)[number]>;
/**
 * Subset of QBtnDropdown props supported in UI design configuration.
 */
export type LinidQBtnDropdownProps = Pick<QBtnDropdownProps, (typeof Q_BTN_DROPDOWN_PROPS)[number]>;
/**
 * Subset of QListProps props supported in UI design configuration.
 */
export type LinidQListProps = Pick<QListProps, (typeof Q_LIST_PROPS)[number]>;
/**
 * Subset of QItemProps props supported in UI design configuration.
 */
export type LinidQItemProps = Pick<QItemProps, (typeof Q_ITEM_PROPS)[number]>;
/**
 * Subset of QItemSectionProps props supported in UI design configuration.
 */
export type LinidQItemSectionProps = Pick<QItemSectionProps, (typeof Q_ITEM_SECTION_PROPS)[number]>;
/**
 * Subset of QItemLabelProps props supported in UI design configuration.
 */
export type LinidQItemLabelProps = Pick<QItemLabelProps, (typeof Q_ITEM_LABEL_PROPS)[number]>;
/**
 * Union type of all supported Quasar component props subsets.
 */
export type LinidQComponentProps = LinidQAvatarProps | LinidQBadgeProps | LinidQBtnDropdownProps | LinidQBtnProps | LinidQCardActionsProps | LinidQCardProps | LinidQDateProps | LinidQDialogProps | LinidQFileProps | LinidQFormProps | LinidQHeaderProps | LinidQIconProps | LinidQImgProps | LinidQInputProps | LinidQItemLabelProps | LinidQItemProps | LinidQItemSectionProps | LinidQListProps | LinidQRouteTabProps | LinidQSelectProps | LinidQSpinnerProps | LinidQTableProps | LinidQTabsProps | LinidQToggleProps | LinidQToolbarProps | LinidQToolbarTitleProps;
/**
 * Valid Quasar component names for type-safe UI design retrieval.
 */
export type QComponentName = 'q-avatar' | 'q-badge' | 'q-btn' | 'q-btn-dropdown' | 'q-card' | 'q-card-actions' | 'q-date' | 'q-dialog' | 'q-file' | 'q-form' | 'q-header' | 'q-icon' | 'q-img' | 'q-input' | 'q-item' | 'q-item-label' | 'q-item-section' | 'q-list' | 'q-route-tab' | 'q-select' | 'q-spinner' | 'q-table' | 'q-tabs' | 'q-toggle' | 'q-toolbar' | 'q-toolbar-title';
export {};
