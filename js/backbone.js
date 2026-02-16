

$(document).ready(function(){

       let post = Backbone.Model.extend({
        urlRoot : "http://localhost/?rest_route=/wp/v2/posts",
        defaults : function(){
            
           return {
              title : "Test Wordpress Post",
              content : "Test Wordpress post content...",
              author : 1,
              comment_status : "open",
              status : "draft",
              format : "standard"
           };
        },
        parse : function( response, options ){

            console.log(JSON.stringify(response, null, 4 ));

            const hash = {};

            if(Array.isArray(response)){

                   if(response[0].id){

                    hash.id = response[0].id;
                    }

                    if(!_.isEmpty(response[0].slug)){

                        hash.slug = response[0].slug;

                    }

                    if(!_.isEmpty(response[0].date)){

                        hash.date = response[0].date;

                    }

                    if(!_.isEmpty(response[0].status)){

                        hash.status = response[0].status;
                    }

                    if(!_.isEmpty(response[0].title.rendered)){

                    hash.title = response[0].title.rendered;

                    }

                    if(!_.isEmpty(response[0].content.rendered)){

                    hash.content = response[0].content.rendered;
                    }

                    if(response[0].author){

                    hash.author = response[0].author;

                    }

                    if(!_.isEmpty(response[0].comment_status)){

                        hash.comment_status = response[0].comment_status;

                    }

                    if(!_.isEmpty(response[0].format)){

                        hash.format = response[0].format;
                    }



                    return hash;

            }//isArray

            if(response.id){

               hash.id = response.id;
            }

            if(!_.isEmpty(response.slug)){

                hash.slug = response.slug;

            }

            if(!_.isEmpty(response.date)){

                hash.date = response.date;

            }

            if(!_.isEmpty(response.status)){

                hash.status = response.status;
            }

            if(!_.isEmpty(response.title.rendered)){

               hash.title = response.title.rendered;

            }

            if(!_.isEmpty(response.content.rendered)){

               hash.content = response.content.rendered;
            }

            if(response.author){

              hash.author = response.author;

            }

            if(!_.isEmpty(response.comment_status)){

                 hash.comment_status = response.comment_status;

            }

            if(!_.isEmpty(response.format)){

                hash.format = response.format;
            }



            return hash;
        }
    });


    $("button#create_post").on("click",function(){

         let title = prompt("Enter the post title:");

         let content = prompt("Enter the post content:");

         let date = new Date();

          let newPost = new post;

                newPost.save({
                    date : date.toISOString(),
                    title : title,
                    content : content,
                },{
                headers : {
                    'Authorization' : 'Basic ' + btoa("YOUR_USERNAME"+":"+"APPLICATION_PASSWORD")
                },
                success : function(model, response, options ){

                    const attsClone = _.clone(model.attributes);


                    $("#response").html("").html(JSON.stringify(response, null, 4));

                    

                },
                error : function(model, response, options ){

                      $("#response").html("");

                    alert(JSON.stringify(response, null, 4));
                }
            });


    });

    
    $("button#read_post").on("click",function(){

         let postId = prompt("Enter the post id:");

         
          let newPost = new post;

            newPost.set("id",postId);

                newPost.fetch({
                headers : {
                    'Authorization' : 'Basic ' + btoa("YOUR_USERNAME"+":"+"APPLICATION_PASSWORD")
                },
                success : function(model, response, options ){

                    const attsClone = _.clone(model.attributes);

                    console.log("Reading data from API");

                    console.log(JSON.stringify(response, null, 4));

                    $("#response").html("").html(JSON.stringify(response, null, 4));

                    

                },
                error : function(model, response, options ){

                      $("#response").html("");

                    alert(JSON.stringify(response, null, 4));
                }
            });

    });

     $("button#update_post").on("click",function(){

         let postId = prompt("Enter the post id:");

          let title = prompt("Enter the post title:");

         let content = prompt("Enter the post content:");

         let date = new Date();

          let newPost = new post;

                newPost.save({
                    id : postId,
                    date : date.toISOString(),
                    title : title,
                    content : content,
                },{
                headers : {
                    'Authorization' : 'Basic ' + btoa("YOUR_USERNAME"+":"+"APPLICATION_PASSWORD")
                },
                success : function(model, response, options ){

                    const attsClone = _.clone(model.attributes);


                    $("#response").html("").html(JSON.stringify(response, null, 4));

                    

                },
                error : function(model, response, options ){

                      $("#response").html("");

                    alert(JSON.stringify(response, null, 4));
                }
            });


    });

     $("button#delete_post").on("click",function(){

         let postId = prompt("Enter the post id:");

         let newPost = new post;

         newPost.set("id",postId);

          newPost.destroy({
                headers : {
                    'Authorization' : 'Basic ' + btoa("YOUR_USERNAME"+":"+"APPLICATION_PASSWORD")
                },
                success : function(model, response, options ){

                    const attsClone = _.clone(model.attributes);


                    $("#response").html("").html(JSON.stringify(response, null, 4));

                    

                },
                error : function(model, response, options ){

                      $("#response").html("");

                    alert(JSON.stringify(response, null, 4));
                }
            });



    });

    
   


});