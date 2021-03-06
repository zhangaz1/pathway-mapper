var pathwayDetails = Backbone.View.extend(
{
    currentLayoutProperties: null,
    events:
    {
        'click #savePathwayDetails': 'saveHandler'
    },
    initialize: function (options)
    {
        this.properties =
        {
            pathwayName: "pathway.txt",
            pathwayTitle: "New Pathway",
            pathwayDescription: ""
        };
    },
    saveHandler: function(event)
    {
        this.properties.pathwayName = this.$el.find("#pName").val();
        this.properties.pathwayTitle = this.$el.find("#pTitle").val();
        this.properties.pathwayDescription = this.$el.find("#pDesc").val();
        this.$el.modal('toggle');
    },
    updatePathwayProperties: function(data)
    {
        this.properties.pathwayName = data.fileName;
        this.properties.pathwayTitle = data.pathwayTitle;
        this.properties.pathwayDescription = data.pathwayDescription;
    },
    copyProperties: function (params)
    {
        this.currentLayoutProperties = _.clone(params);
    },
    render: function ()
    {
        this.template = _.template($("#pathwayDetailsTemplate").html());
        var tplContent = this.template(this.properties);
        this.$el.empty();
        this.$el.append(tplContent);
        this.delegateEvents();

        //Disable input enter event
        this.$el.find('input').on('keypress', function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
            }
        });
        return this;
    },
    getPathwayData : function()
    {
        var pathwayData =
        {
            fileName: this.properties.pathwayName,
            pathwayTitle: this.properties.pathwayTitle,
            pathwayDescription: this.properties.pathwayDescription
        };

        return pathwayData;
    },
});

module.exports = pathwayDetails;
