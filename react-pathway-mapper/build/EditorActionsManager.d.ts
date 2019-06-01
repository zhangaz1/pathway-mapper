import CBioPortalAccessor from "./CBioPortalAccessor";
export default class EditorActionsManager {
    cy: any;
    defaultLayoutProperties: any;
    private FIT_CONSTANT;
    private layoutProperties;
    private observers;
    private svgExporter;
    private genomicDataOverlayManager;
    private selectedNodeStack;
    private undoRedoManager;
    private isCbioPortal;
    private isCollaborative;
    private shareDBManager;
    private edgeEditing;
    private portalAccessor;
    constructor(isCollaborative: boolean, shareDBManager: any, cyInst: any, isCBioPortal: boolean, edgeEditing: any, undoRedoManager: any, portalAccessor: CBioPortalAccessor);
    handleChangePositionByAlignment(movedNodeArr: any): void;
    doChangePosition(movedNodes: any): {
        node: any;
        oldPosition: {
            x: any;
            y: any;
        };
        nextPosition: any;
    }[];
    undoChangePosition(movedNodes: any): {
        node: any;
        oldPosition: any;
        nextPosition: {
            x: any;
            y: any;
        };
    }[];
    changeNodePositionsByArrows(selectedNodes: any): void;
    doChangeNodeSize(args: any): any;
    undoChangeNodeSize(args: any): any;
    doChangeCompoundSize(args: any): any;
    undoChangeCompoundSize(args: any): any;
    changeName(ele: any, newName: any): void;
    changeNameCy(ele: any, newName: any): void;
    doChangename(args: any): {
        ele: any;
        newName: any;
        oldName: any;
    };
    undoChangeName(args: any): {
        ele: any;
        newName: any;
        oldName: any;
    };
    hideSelectedNodes(): void;
    doHide(args: any): any;
    undoHide(args: any): any;
    showAllNodes(): void;
    doShow(args: any): any;
    undoShow(args: any): any;
    highlightElementsInitially(invalidHighlightedGenesIDs: string[], invalidGenesIDs: string[], highlightedGenesIDs: string[], highlightedEdgesIDs: string[], hiddenGenesIDs: string[]): void;
    validateGenes(): void;
    getGeneSymbols(): any[];
    highlightInvalidGenes(validGeneSymbols: any): void;
    removeInvalidGeneHighlights(actions: any[]): void;
    doHighlightInvalidGenes(args: any): any;
    undoHighlightInvalidGenes(args: any): any;
    highlightSelected(): void;
    highlightNeighbors(): void;
    highlightBySearch(args: any[]): void;
    removeOtherHighlight(actions: any[]): void;
    doHighlight(args: any): any;
    undoHighlight(args: any): any;
    removeAllHighlight(): void;
    postLayout(): void;
    getEmptyGroupID(): void;
    groupGenomicData(cancerNames: any[], groupID: string): void;
    addPubmedIDs(edge: any, pubmedIDs: number): void;
    removePubmedID(edge: any, pubmedIDs: number[]): void;
    updateEdgeBendPoints(edge: any): void;
    pushSelectedNodeStack(ele: any): void;
    removeElementFromSelectedNodeStack(ele: any): void;
    clearSelectedNodeStack(): void;
    exportSVG(): void;
    registerObserver(observer: any): void;
    notifyObservers(): void;
    registerGenomicDataObserver(observer: any): void;
    updateGenomicDataVisibility(dataMap: any): void;
    getGlobalOptions(): {
        zoomLevel: any;
        panLevel: any;
    };
    changeGlobalOptions(op: any): void;
    updateGlobalOptions(newOptions: any): void;
    saveLayoutProperties(newLayoutProps: any): void;
    updateLayoutPropertiesCallback(op: any): void;
    performLayout(): void;
    addNode(nodeData: any, posData: any): void;
    addNodes(nodes: any[]): void;
    addNodesCy(nodes: any[]): void;
    addNodetoCy(nodeData: any, posData: any): void;
    shareDBNodeAddRemoveEventCallBack(op: any): void;
    addNewNodeLocally(realtimeNode: any): void;
    addNewNodeToShareDB(nodeData: any, posData: any): void;
    addEdge(edgeData: any): void;
    addEdges(edges: any[]): void;
    addEdgesCy(edges: any[]): void;
    addNewEdgeShareDB(edgeData: any): void;
    addNewEdgetoCy(edgeData: any): void;
    shareDBEdgeAddRemoveEventCallBack(op: any): void;
    addNewElementsLocally(realTimeNodeArray: any[], realTimeEdgeArray: any[]): void;
    addNewEdgeLocally(edge: any): void;
    reconnectEdge(sourceID: string, targetID: string, edgeData: any): any;
    reconnectEdgeInShareDB(sourceID: string, targetID: string, edgeData: any): void;
    removeElement(ele: any): void;
    removeElementCy(ele: any): void;
    removeElementsCy(ele: any): void;
    removeElementsFromShareDB(eles: any[]): void;
    removeElementFromShareDB(ele: any): void;
    changeParents(eles: any[], newParentId: string): void;
    changeParentShareDB(eles: any, newParentId: string): void;
    changeParentCy(eles: any[], newParentId: string): void;
    moveElements(eles: any[]): void;
    resizeElements(ele: any): void;
    mergeGraph(nodes: any[], edges: any[]): void;
    mergeGraphCy(nodes: any[], edges: any[]): void;
    fitGraph(): void;
    loadFile(nodes: any[], edges: any[]): void;
    loadFileCy(nodes: any[], edges: any[]): void;
    loadfileShareDB(nodes: any[], edges: any[]): void;
    removeAllElements(): void;
    updateHighlight(ele: any, isHighlighted: boolean): void;
    updateVisibility(ele: any, isHidden: boolean): void;
    updateElementCallback(op: any): void;
    getGenomicDataSVG(node: any): any;
    removeGenomicData(): void;
    addGenomicData(genomicData: any): void;
    addPortalGenomicData(genomicData: any, groupID: any): void;
    shareDBGenomicDataHandler(op: any): void;
    shareDBGenomicDataGroupChangeHandler(op: any): void;
    shareDBGenomicDataVsibilityHandler(op: any): void;
    resizeNodesToContent(nodes: any[]): void;
}