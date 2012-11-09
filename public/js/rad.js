// Generated by CoffeeScript 1.4.0
(function() {
  var EDGES, Edge, PlanarGraph, VNUM, Vertex, View;

  Vertex = (function() {

    function Vertex(x, y) {
      this.x = x;
      this.y = y;
    }

    Vertex.prototype.setPosition = function(x, y) {
      this.x = x;
      this.y = y;
    };

    return Vertex;

  })();

  Edge = (function() {

    function Edge(v1, v2) {
      this.v1 = v1;
      this.v2 = v2;
    }

    Edge.prototype.intersect = function(vertices) {
      return this.intersect = true;
    };

    return Edge;

  })();

  VNUM = 10;

  EDGES = [[0, 1], [0, 2], [1, 3], [1, 4], [1, 2], [2, 4], [2, 5], [3, 7], [3, 4], [4, 7], [4, 6], [4, 5], [5, 6], [6, 7], [6, 8], [6, 9], [7, 8], [8, 9]];

  Array.prototype.shuffle = function() {
    return this.sort(function() {
      return 0.5 - Math.random();
    });
  };

  PlanarGraph = (function() {

    function PlanarGraph(complexity, planeWidth, planeHeight) {
      var p, pair, places, x, y, _i, _j, _k, _len, _len1, _results;
      this.complexity = complexity;
      this.planeWidth = planeWidth;
      this.planeHeight = planeHeight;
      console.log(this.planeWidth, this.planeHeight);
      places = (function() {
        _results = [];
        for (_i = 0; _i <= 90; _i++){ _results.push(_i); }
        return _results;
      }).apply(this).shuffle().slice(0, VNUM);
      this.vertices = [];
      for (_j = 0, _len = places.length; _j < _len; _j++) {
        p = places[_j];
        x = Math.round((p % 10) * (this.planeWidth / 10)) + Math.round(this.planeWidth / 20);
        y = Math.round((p / 10) * (this.planeHeight / 10)) + Math.round(this.planeHeight / 20);
        this.vertices.push(new Vertex(x, y));
      }
      this.edges = [];
      for (_k = 0, _len1 = EDGES.length; _k < _len1; _k++) {
        pair = EDGES[_k];
        this.edges.push(new Edge(this.vertices[pair[0]], this.vertices[pair[1]]));
      }
    }

    return PlanarGraph;

  })();

  View = (function() {

    function View(id) {
      var _this = this;
      this.id = id;
      this.valid = false;
      this.graph = new PlanarGraph(1, $('#' + this.id).width(), $('#' + this.id).height());
      this.ctx = document.getElementById(this.id).getContext('2d');
      setInterval((function() {
        return _this.render();
      }), 30);
      this.selected = null;
      $('#' + this.id).mousedown(function(ev) {
        return _this.select(ev);
      });
      $('#' + this.id).mouseup(function(ev) {
        return _this.deselect(ev);
      });
      $('#' + this.id).mousemove(function(ev) {
        return _this.move(ev);
      });
    }

    View.prototype.select = function(ev) {
      var v, x, y, _i, _len, _ref;
      x = ev.pageX - $('#' + this.id).offset().left;
      y = ev.pageY - $('#' + this.id).offset().top;
      _ref = this.graph.vertices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        if (((v.x - 15 <= x && x <= v.x + 15)) && ((v.y - 15 <= y && y <= v.y + 15))) {
          this.selected = v;
          console.log(v);
          return;
        }
      }
      return this.selected = null;
    };

    View.prototype.deselect = function(ev) {
      return this.selected = null;
    };

    View.prototype.move = function(ev) {
      var x, y;
      if (this.selected === null) {
        return;
      }
      x = ev.pageX - $('#' + this.id).offset().left;
      y = ev.pageY - $('#' + this.id).offset().top;
      this.selected.setPosition(x, y);
      return this.valid = false;
    };

    View.prototype.render = function() {
      var e, v, _i, _j, _len, _len1, _ref, _ref1;
      if (this.valid) {
        return;
      }
      this.ctx.clearRect(0, 0, this.graph.planeWidth, this.graph.planeHeight);
      this.ctx.save();
      _ref = this.graph.edges;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        this.ctx.beginPath();
        this.ctx.moveTo(e.v1.x, e.v1.y);
        this.ctx.lineTo(e.v2.x, e.v2.y);
        this.ctx.stroke();
      }
      this.ctx.restore();
      _ref1 = this.graph.vertices;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        v = _ref1[_j];
        this.ctx.beginPath();
        this.ctx.arc(v.x, v.y, 15, 0, Math.PI * 2, true);
        this.ctx.fill();
      }
      return this.valid = true;
    };

    return View;

  })();

  $(function() {
    var view;
    return view = new View('area');
  });

}).call(this);