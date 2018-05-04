
export function calculateSidebarWidth(isVisible) {
    const widthValue = isVisible ? '20rem' : '0';
    const sidebarStyle = { width: widthValue };
    
    return sidebarStyle;
}