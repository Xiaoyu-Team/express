$(function(){
    $(".comment").click(function(){
        var target = $(this)
        var toId = target.data("tid")
        var commentId = target.data("cid")

        if($("#toId").length　> 0){
            $(".replayId").attr("value",tId)
        }else {

            $("<input>").attr({
                type: "hidden",
                value: toId,
                id: "toId",
                name: "commentId"

            }).appendTo("#commentForm")
        }


        if ($('#commentId').length > 0) {
      $('#commentId').val(commentId)
    }
        else {
          $('<input>').attr({
            type: 'hidden',
            id: 'commentId',
            name: 'commentcId',
            value: commentId
          }).appendTo('#commentForm')
        }

    })
})

