var cubesData = [], alpha = 0, beta = 0, key = function (d) { return d.id; };
function processData(data, tt, n) {
    /* --------- CUBES ---------*/
    var origin = [n * 100 / 2 + 80, n * 30], scale = 20
    var cubes3D = d3._3d()
        .shape('CUBE')
        .x(function (d) { return d.x; })
        .y(function (d) { return d.y; })
        .z(function (d) { return d.z; })
        .rotateX(-math.PI / 8)
        .rotateY(5 * math.PI / 6)
        .rotateZ(math.PI)
        .origin(origin)
        .scale(scale);

    var svg = d3.select('#Heatmap > svg').append('g');
    var cubesGroup = svg.append('g').attr('class', 'cubes');
    var cubes = cubesGroup.selectAll('g.cube').data(data, function (d) { return d.id });


    var ce = cubes
        .enter()
        .append('g')
        .attr('class', 'cube')
        .attr('fill', 'grey ')
        .attr('stroke', 'black ')
        .merge(cubes)
        .sort(cubes3D.sort);

    cubes.exit().remove();

    /* --------- FACES ---------*/

    var faces = cubes.merge(ce).selectAll('path.face').data(function (d) { return d.faces; }, function (d) { return d.face; });

    faces.enter()
        .append('path')
        .attr('class', 'face')
        .attr('fill-opacity', 0.95)
        .classed('_3d', true)
        .merge(faces)
        .transition().duration(tt)
        .attr('d', cubes3D.draw);

    faces.exit().remove();

    /* --------- TEXT ---------*/

    var texts = cubes.merge(ce).selectAll('text.text').data(function (d) {
        var _t = d.faces.filter(function (d) {
            return d.face === 'top';
        });
        return [{ height: d.height, centroid: _t[0].centroid }];
    });

    texts
        .enter()
        .append('text')
        .attr('class', 'text')
        .attr('dy', '-.7em')
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('font-weight', 'bolder')
        .attr('x', function (d) { return origin[0] + scale * d.centroid.x })
        .attr('y', function (d) { return origin[1] + scale * d.centroid.y })
        .classed('_3d', true)
        .merge(texts)
        .transition().duration(tt)
        .attr('fill', 'black')
        .attr('stroke', 'none')
        .attr('x', function (d) { return origin[0] + scale * d.centroid.x })
        .attr('y', function (d) { return origin[1] + scale * d.centroid.y })
        .tween('text', function (d) {
            var that = d3.select(this);
            var i = d3.interpolateNumber(+that.text(), Math.abs(d.height / 5));
            return function (t) {
                that.text(i(t).toFixed(1));
            };
        });

    texts.exit().remove();

    /* --------- SORT TEXT & FACES ---------*/

    ce.selectAll('._3d').sort(d3._3d().sort);

}

function Generate(densitymatrix) {
    var n = densitymatrix.length
    var k = 2.5 * (n / 2 + 1)
    cubesData = [];
    var cnt = 0;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var x = -k + 2.5 * i
            var z = -k + 2.5 * j
            var h = 5 * math.abs(densitymatrix[i][j]);
            var _cube = makeCube(h, x, z);
            _cube.id = 'cube_' + cnt++;
            _cube.height = h;
            cubesData.push(_cube);

        }
    }
    d3.select("#Heatmap")
        .append("svg")
        .attr("width", n * 100)
        .attr("height", n * 60)
    var origin = [n * 100 / 2 + 80, n * 30], scale = 20
    var cubes3D = d3._3d()
        .shape('CUBE')
        .x(function (d) { return d.x; })
        .y(function (d) { return d.y; })
        .z(function (d) { return d.z; })
        .rotateX(-math.PI / 8)
        .rotateY(5 * math.PI / 6)
        .rotateZ(math.PI)
        .origin(origin)
        .scale(scale);
    processData(cubes3D(cubesData), 1000, n);
}

function makeCube(h, x, z) {
    var d = 0.5
    return [
        { x: x - d, y: h, z: z + d }, // FRONT TOP LEFT
        { x: x - d, y: 0, z: z + d }, // FRONT BOTTOM LEFT
        { x: x + d, y: 0, z: z + d }, // FRONT BOTTOM RIGHT
        { x: x + d, y: h, z: z + d }, // FRONT TOP RIGHT
        { x: x - d, y: h, z: z - d }, // BACK  TOP LEFT
        { x: x - d, y: 0, z: z - d }, // BACK  BOTTOM LEFT
        { x: x + d, y: 0, z: z - d }, // BACK  BOTTOM RIGHT
        { x: x + d, y: h, z: z - d }, // BACK  TOP RIGHT
    ];
}

