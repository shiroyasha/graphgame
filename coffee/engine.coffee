
class Vertex
    constructor: (@x, @y) ->

    setPosition: (@x, @y) ->


class Edge
    constructor: (@v1, @v2) ->

    intersect: (vertices) ->
        @intersect = true
        



VNUM = 10
EDGES = [[0, 1], [0, 2],
         [1, 3], [1, 4], [1, 2],
         [2, 4], [2, 5],
         [3, 7], [3, 4],
         [4, 7], [4, 6], [4, 5],
         [5, 6],
         [6, 7], [6, 8], [6, 9],
         [7, 8],
         [8, 9] ]

Array::shuffle = -> @sort -> 0.5 - Math.random()

class PlanarGraph
    constructor: (@complexity, @planeWidth, @planeHeight) ->
        console.log @planeWidth, @planeHeight
        places = [0..90].shuffle().slice( 0,VNUM )

        @vertices = []

        for p in places
            x = Math.round( (p % 10) * (@planeWidth / 10 ) ) + Math.round(@planeWidth / 20)
            y = Math.round( (p / 10) * (@planeHeight / 10 ) ) + Math.round(@planeHeight / 20)

            @vertices.push( new Vertex( x, y) )

        @edges = []
        for pair in EDGES
           @edges.push new Edge( @vertices[pair[0]], @vertices[pair[1]] )

        # TODO check for intersects



class View

    constructor: (@id) ->
        @valid = false
        @graph = new PlanarGraph(1, $('#'+@id).width(), $('#'+@id).height())
        
        @ctx = document.getElementById(@id).getContext('2d')

        setInterval( ( => @render() ), 30 )

        @selected = null

        $('#' + @id).mousedown (ev) => @select(ev)
        $('#' + @id).mouseup (ev) => @deselect(ev)
        $('#' + @id).mousemove (ev) => @move(ev)

    select: (ev) ->
        x = ev.pageX - $('#' + @id ).offset().left
        y = ev.pageY - $('#' + @id ).offset().top

        for v in @graph.vertices
            if (v.x - 15 <= x <= v.x + 15) && (v.y - 15 <= y <= v.y + 15)
                @selected = v
                console.log v
                return

        @selected = null

        

    deselect: (ev) ->
        @selected = null

    move: (ev) ->
        if @selected is null then return

        x = ev.pageX - $('#' + @id ).offset().left
        y = ev.pageY - $('#' + @id ).offset().top

        @selected.setPosition( x, y )
        @valid = false



    render: () ->
        if @valid then return
        
        @ctx.clearRect(0, 0, @graph.planeWidth, @graph.planeHeight)
        
        @ctx.save()
        for e in @graph.edges
            @ctx.beginPath()
            @ctx.moveTo e.v1.x, e.v1.y
            @ctx.lineTo e.v2.x, e.v2.y
            @ctx.stroke()

        @ctx.restore()
            
        for v in @graph.vertices
            @ctx.beginPath()
            @ctx.arc( v.x, v.y, 15 ,0 ,Math.PI*2, true)
            @ctx.fill()

        @valid = true


$ ->
    view = new View('area')

        
