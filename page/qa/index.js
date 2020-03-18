$(function () {




    $('.tab').removeClass('tab-active')
    $('.tab').eq(0).addClass('tab-active')
    var qa = data[0];
    var html=[];
    for (var i=0;i<qa.length;i++)
    {
        html.push('<h1>Q'+(i+1)+'、 '+ qa[i].q+'</h1>');
        var a = qa[i].a;
        for(var m =0;m<a.length;m++)
        {
            if(a[m].indexOf('<p>')>0){
                html.push(a[m])
            }else{
                html.push('<p>'+a[m]+'</p>')
            }

        }
    }

    $('.qa').html(html.join(''))



    $('.tab').click(function () {
        var index = $(this).index();
        var qaEle = $('.qa');

        $('.tab').removeClass('tab-active')
        $('.tab').eq(index).addClass('tab-active')
        var qa = data[index];
        var html=[];
        for (var i=0;i<qa.length;i++)
        {
            html.push('<h1>Q'+(i+1)+'、 '+ qa[i].q+'</h1>');
            var a = qa[i].a;
            for(var m =0;m<a.length;m++)
            {
                if(a[m].indexOf('<p>')>0){
                    html.push(a[m])
                }else{
                    html.push('<p>'+a[m]+'</p>')
                }
            }
        }


        qaEle.html(html.join(''))
    })
    
    $('.search-input-btn').click(function () {

        var value = $('#search-input').val();

        if(value){

            var matches =[];
            for (var i=0;i<data.length;i++)
            {
                var questions = data[i];
                for(var m =0;m<questions.length;m++){
                    console.log('questions[m].q'+questions[m].q)
                    console.log('value'+value)
                    if(questions[m].q.indexOf(value)>=0){
                        matches.push(questions[m]);
                    }
                }
            }


            var html=[];
            for(var n=0;n<matches.length;n++){
                html.push('<h1>Q'+(n+1)+'、 '+ matches[n].q+'</h1>');
                var a = matches[n].a;
                for(var j =0;j<a.length;j++)
                {
                    if(a[j].indexOf('<p>')>0){
                        html.push(a[j])
                    }else{
                        html.push('<p>'+a[j]+'</p>')
                    }
                }
            }


            if(html.length>0){
                $('.qa').html(html.join(''))
            }else{
                $('.qa').html('<div class="nodata"><img src="../../public/image/zanwushuju@2x.png"><div>暂无数据</div></div>')
            }




        }else{
            $('.tab').removeClass('tab-active')
            $('.tab').eq(0).addClass('tab-active')
            var qa = data[0];
            var html=[];
            for (var i=0;i<qa.length;i++)
            {
                html.push('<h1>Q'+(i+1)+'、 '+ qa[i].q+'</h1>');
                var a = qa[i].a;
                for(var m =0;m<a.length;m++)
                {
                    if(a[m].indexOf('<p>')>0){
                        html.push(a[m])
                    }else{
                        html.push('<p>'+a[m]+'</p>')
                    }

                }
            }

            $('.qa').html(html.join(''))
        }



    })



})