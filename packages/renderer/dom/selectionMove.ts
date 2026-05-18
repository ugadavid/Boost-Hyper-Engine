export interface SelectionMoveControllerOptions {
  selectedClassName?: string;
  announce?: (message: string) => void;
  getItemLabel?: (item: HTMLElement) => string;
}

export interface SelectionMoveController {
  clearSelection: () => void;
  clearSelectionIfSelected: (item: HTMLElement) => void;
  moveSelectedItemTo: (destination: HTMLElement, destinationLabel: string) => boolean;
  returnSelectedItemToTray: (destination: HTMLElement) => boolean;
  selectItem: (item: HTMLElement) => void;
}

export function createSelectionMoveController(
  options: SelectionMoveControllerOptions = {}
): SelectionMoveController {
  const selectedClassName = options.selectedClassName ?? "is-selected";
  const getItemLabel =
    options.getItemLabel ??
    ((item: HTMLElement) => item.getAttribute("aria-label") ?? item.textContent ?? "item");
  let selectedItem: HTMLElement | undefined;

  function announce(message: string): void {
    options.announce?.(message);
  }

  function clearSelection(): void {
    selectedItem?.classList.remove(selectedClassName);
    selectedItem?.setAttribute("aria-pressed", "false");
    selectedItem = undefined;
  }

  function clearSelectionIfSelected(item: HTMLElement): void {
    if (selectedItem === item) {
      clearSelection();
    }
  }

  function selectItem(item: HTMLElement): void {
    clearSelection();
    selectedItem = item;
    item.classList.add(selectedClassName);
    item.setAttribute("aria-pressed", "true");
    announce(`Selected "${getItemLabel(item)}".`);
  }

  function moveSelectedItemTo(destination: HTMLElement, destinationLabel: string): boolean {
    if (!selectedItem) {
      announce("No item selected.");
      return false;
    }

    const item = selectedItem;
    const itemLabel = getItemLabel(item);
    destination.append(item);
    clearSelection();
    announce(`Moved "${itemLabel}" to "${destinationLabel}".`);
    return true;
  }

  function returnSelectedItemToTray(destination: HTMLElement): boolean {
    if (!selectedItem) {
      announce("No item selected.");
      return false;
    }

    const item = selectedItem;
    const itemLabel = getItemLabel(item);
    destination.append(item);
    clearSelection();
    announce(`Returned "${itemLabel}" to tray.`);
    return true;
  }

  return {
    clearSelection,
    clearSelectionIfSelected,
    moveSelectedItemTo,
    returnSelectedItemToTray,
    selectItem
  };
}
