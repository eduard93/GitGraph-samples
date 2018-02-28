/**
 * Created by eduard on 23.02.2018.
 */


function exportCanvasAsPNG(id, fileName) {

    var canvasElement = document.getElementById(id);

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

var templateOld = {
    colors: ["#979797", "#008fb5", "#f1c109"],
    branch: {
        lineWidth: 10,
        spacingX: 50,
        labelRotation: 0,
        showLabel: true
    },
    commit: {
        spacingY: -80,
        dot: {
            size: 14
        },
        message: {
            font: "normal 14pt Arial"
        }
    }
};

var template = {
    colors: ["#979797", "#008fb5", "#f1c109", "#B50034", "#00B581"],
    branch: {
        lineWidth: 15,
        spacingX: 150,
        labelRotation: 0,
        showLabel: true,
        labelFont: "normal 28pt Arial"
    },
    commit: {
        spacingY: -180,
        dot: {
            size: 28
        },
        message: {
            font: "normal 28pt Arial"
        }
    }
};

function getGraph(element) {
     return new GitGraph({
        template: template,
        reverseArrow: false,
        orientation: "horizontal",
        mode: "compact",
        elementId: element
    })
};

function case1() {
    var gitgraph = getGraph("case1");
    var master = gitgraph.branch("master").commit().commit();
};

function case2() {
    var gitgraph = getGraph("case2");
    var master = gitgraph.branch("master").commit().commit().commit().commit().commit();
};

function case3() {
    var gitgraph = getGraph("case3");
    var master = gitgraph.branch("master").commit().commit();
    var develop = gitgraph.branch("develop");    // New branch from HEAD

    develop.commit().commit();
    master.commit();
};

function case4() {
    var gitgraph = getGraph("case4");
    var master = gitgraph.branch("master").commit().commit();
    var develop = gitgraph.branch("develop");    // New branch from HEAD

    develop.commit().commit();
    master.commit();
    develop.merge(master);
};

function case5() {
    var gitgraph = getGraph("case5");
    var master = gitgraph.branch("master").commit().commit();
    var develop = gitgraph.branch("develop");    // New branch from HEAD

    develop.commit().commit();
    master.commit();
    develop.merge(master);
    master.commit();

    var feature = gitgraph.branch("feature");
    master.commit();
    feature.commit();


};

function case6() {
    var gitgraph = getGraph("case6");
    var master = gitgraph.branch("master").commit().commit();
    var feature1 = gitgraph.branch("feature1");    // New branch from HEAD

    feature1.commit().commit();
    feature1.merge(master);
    master.commit();

    var feature2 = gitgraph.branch("feature2");
    feature2.commit().commit();
    feature2.merge(master);
};

function case7() {
    var gitgraph = getGraph("case7");
    var master = gitgraph.branch("master").commit();


    var feature1 = gitgraph.branch("feature1");    // New branch from HEAD
    var feature2 = gitgraph.branch("feature2");

    var preprod = gitgraph.branch("preprod");
    var prod = gitgraph.branch("prod");

    feature1.commit().commit();
    feature1.merge(master);



    feature2.commit().commit();
    feature2.merge(master);

    master.merge(preprod);

    preprod.merge(prod);

    master.commit();

};





function main() {

    var func = "case";
    for (i = 1; i < 8; i++) {
        var name = func + i
        window[name]();
        exportCanvasAsPNG(name, name  + ".png");
        window.scrollTo(0,document.body.scrollHeight);
    }
};