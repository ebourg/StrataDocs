$(function(){
  var cname = function(name) {
    return name.replace(/[ \/<>]/g, '-');
  }

  var list;
  if ( $("#toc").length ) {
    list = $("<ul />");
    $("#toc").append(list);
  }

  $('#main').children(":header:not(h1):not(h2.title)").each(function(i) {
    var current = $(this);
    var text = current.text();
    var id = cname(text);
    current.attr("id", id);
    if(current.is("h2") && list){
      list.append("<li><a href=\"#" + encodeURIComponent(id) + "\">" + text + "</a></li>");
    }
  });

  $('#toc').addClass('toc');
});
