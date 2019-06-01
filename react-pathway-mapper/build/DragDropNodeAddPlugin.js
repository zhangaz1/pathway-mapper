import $ from "jquery";
import 'jqueryui';
export default class DragDropNodeAddPlugin {
    constructor(editor) {
        this.editor = editor;
        this.initNodeAdd();
    }
    //TODO JQUERY IS IGNORED
    initNodeAdd() {
        var nodeAddClass = this;
        var defaults = {
            height: 30,
            width: 30,
            padding: 5,
            backgroundColorDiv: '#fbfbfb',
            borderColorDiv: '#fff',
            borderWidthDiv: '0px',
            borderRadiusDiv: '5px',
            icon: '',
            nodeParams: function () {
                // return element object to be passed to cy.add() for adding node
                return {};
            }
        };
        // @ts-ignore
        $.fn.cytoscapeNodeadd = function (params) {
            var options = $.extend(true, {}, defaults, params);
            var fn = params;
            var functions = {
                destroy: function () {
                    var $this = $(this);
                    $this.find(".ui-cytoscape-nodeadd").remove();
                },
                init: function () {
                    return $(this).each(function () {
                        var components = options.components;
                        for (var index in components) {
                            var component = components[index];
                            var dragContainer = component.container;
                            //var explanationText = component.explanationText;
                            var $nodeadd = $('<div class="ui-cytoscape-nodeadd"></div>');
                            dragContainer.append($nodeadd);
                            var $nodeDragHandle = $('<div class="ui-cytoscape-nodeadd-nodediv"> \
                                                <span id="ui-cytoscape-nodeadd-icon" class="draggable" nodeType="' + component.nodeType + '">\
                                                  <img style="width:110px;" src="./assets/nodes/' + component.nodeType + '.svg" alt="" />\
                                                </span>\
                                              </div>');
                            $nodeadd.append($nodeDragHandle);
                            $nodeDragHandle.bind("mousedown", function (e) {
                                e.stopPropagation(); // don't trigger dragging of nodeadd
                                e.preventDefault(); // don't cause text selection
                            });
                            //Setup UI
                            dragContainer.find(".ui-cytoscape-nodeadd-nodediv").css({
                                background: options.backgroundColorDiv,
                                border: options.borderWidthDiv + ' solid ' + options.borderColorDiv,
                                'border-radius': options.borderRadiusDiv
                            });
                            //Init Draggable
                            dragContainer.find("#ui-cytoscape-nodeadd-icon").draggable({
                                helper: "clone",
                                cursor: "pointer"
                            });
                        }
                        // @ts-ignore TODO: AMENDMENT ATTENTION
                        var $container = $(this);
                        //Init Droppable
                        // @ts-ignore TODO: Droppable is ignored
                        $container.droppable({
                            activeClass: "ui-state-highlight",
                            // accept: "#ui-cytoscape-nodeadd-icon",
                            drop: function (event, ui) {
                                $container.removeClass("ui-state-highlight");
                                var currentOffset = $container.offset();
                                var relX = event.pageX - currentOffset.left;
                                var relY = event.pageY - currentOffset.top;
                                var nodeType = $(ui.helper).attr('nodeType').toUpperCase();
                                var cy = this.cy;
                                //Hold a map for parents and candidate parent nodes for this addition
                                var nodeMap = {};
                                var parentMap = {};
                                //Loop through nodes for hit testing about drag position on canvas
                                cy.nodes().forEach(function (node) {
                                    var nodeBbox = node.renderedBoundingBox();
                                    //Rectangle point test
                                    if ((relX <= nodeBbox.x2 && relX >= nodeBbox.x1) && (relY <= nodeBbox.y2 && relY >= nodeBbox.y1) && node.data().type != 'GENE') {
                                        //If node has a children put an entry to the parentMap
                                        if (node.children().length > 0) {
                                            parentMap[node.id()] = true;
                                        }
                                        //If parent of this node is already added to the node map remove it, since our candidate is in deeper level !
                                        if (parentMap[node._private.data.parent]) {
                                            delete nodeMap[node._private.data.parent];
                                        }
                                        //Add an entry to node map
                                        nodeMap[node.id()] = node;
                                    }
                                });
                                //Check if any parent found, if so set parent field
                                var parent = nodeMap[Object.keys(nodeMap)[0]];
                                var nodeData = { w: "0", h: "100", parent: 0, type: nodeType, name: 'New ' + $(ui.helper).attr('nodeType') };
                                if (parent) {
                                    if (parent.data().type == "FAMILY" || parent.data().type == "COMPLEX") {
                                        if (nodeType != "COMPARTMENT" && nodeType != "PROCESS") {
                                            nodeData.parent = parent.id();
                                        }
                                    }
                                    else {
                                        nodeData.parent = parent.id();
                                    }
                                }
                                //TODO one place access to these
                                nodeData.w = "150";
                                nodeData.h = "52";
                                //Adjust position according to the zoom level and pan !
                                //To set rendered position !!!
                                //TODO refactor this !
                                relX = relX / cy.zoom() + cy.extent().x1;
                                relY = relY / cy.zoom() + cy.extent().y1;
                                nodeAddClass.editor.addNode(nodeData, { x: relX, y: relY });
                            }
                        });
                    });
                }
            };
            if (functions[fn]) {
                return functions[fn].apply(this, Array.prototype.slice.call(arguments, 1));
            }
            else if (typeof fn == 'object' || !fn) {
                return functions.init.apply(this, arguments);
            }
            else {
                $.error("No such function `" + fn + "` for jquery.cytoscapenodeadd");
            }
            return $(this);
        };
        // @ts-ignore
        $.fn.cynodeadd = $.fn.cytoscapeNodeadd;
        /* Adding as an extension to the core functionality of cytoscape.js*/
        this.cy('core', 'nodeadd', (options) => {
            // @ts-ignore
            $(this.cy.container()).cytoscapeNodeadd(options);
        });
    }
}
//# sourceMappingURL=DragDropNodeAddPlugin.js.map