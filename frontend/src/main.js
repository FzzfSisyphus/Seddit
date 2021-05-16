/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
  // your app initialisation goes here
  Start();  // initialise whole page 

  localStorage.clear(); // clean all the localStorage.
  /////////////////////////
 
  const buttons = document.getElementsByClassName('button');  // get all the buttons that we need
  const login = buttons[0];  // get log in button
  const signup = buttons[1]; // get sign up button
  const post = buttons[2]; // get post button
  
  
  login.onclick = function() { 
    LOGIN(apiUrl) ;
  };
  signup.onclick = function() { 
    SIGN(apiUrl) ;
  };
  post.onclick = function() { 
    alert("yes");
  };
  
  post_public(apiUrl);  // feed the post of public  before log in and sign up   
}

function Start(){
  // div "root"
  const root = document.getElementById("root");
  
  // root -> header
  const header = document.createElement("header");
  root.appendChild(header);
  header.className = "banner";
  header.id = "nav";
  
  //header -> logo
    const logo = document.createElement("h1");
    logo.id = "logo";
    logo.className = "flex-center";
    logo.innerText = "Seddit";
    header.appendChild(logo);
  
    // header -> search 
    const search = document.createElement("div");
    search.class = "nav-item";
    const scinput  = document.createElement("input");
    scinput.id = "search";
    scinput.setAttribute("data-id-search","");
    scinput.setAttribute("placeholder", "Search Seddit");
    scinput.setAttribute("type", "search");
    search.appendChild(scinput);
    header.appendChild(search);
    
    //header ->button
    const buttons = document.createElement("div");
    buttons.class ="nav";
    header.appendChild(buttons);

  
    //button -> login
      const login = document.createElement("li");
      login.className = "nav-item";
      const lgbt = document.createElement("button");
      lgbt.setAttribute ("data-id-login","");
      lgbt.className = "button button-primary";
      lgbt.innerText = "Log In";
      login.appendChild(lgbt);
      buttons.appendChild(login);
    
    //button -> sign up
    const signup = document.createElement("li");
    signup.className = "nav-item";  
    const spbt = document.createElement("button");
    spbt.setAttribute("data-id-signup","");
    spbt.className = "button button-secondary";
    spbt.innerText = "Sign Up";
    signup.appendChild(spbt);
    buttons.appendChild(signup);
  
  //root -> main
  const main = document.createElement("main");
  root.appendChild(main);
  
  //main -> feed  
    const feed  = document.createElement("ul");
    feed.id = "feed";
    main.appendChild(feed);
  
    // feed -> feed header(text and button)
    const feedHeader = document.createElement("div");
    feedHeader.className = "feed-header";
    const fdtext = document.createElement("h3");
    fdtext.innerText = "Popular posts";
    const fdbutton = document.createElement("button");
    fdbutton.className = "button button-secondary";
          
    fdbutton.innerText = "Post";
    feedHeader.appendChild(fdtext);
    feedHeader.appendChild(fdbutton);
    feed.appendChild(feedHeader);

  // root -> footer
  const footer = document.createElement("footer");
  footer.id ="footer";
  root.appendChild(footer);
  
    //elements under footer
    const fttext = document.createElement("p");
    footer.appendChild(fttext);
    fttext.innerText = "Seeddit Hope you enjoy! >.<";
}


function LOGIN(apiUrl){  // hide the "feed" and pop login box

  // check if sign box is showing, 
  if(document.getElementById("sign_box") != null){
      document.getElementById("sign_box").style.display="none";
  }

    CleanWeb();   // hide the main page
    
  // if there is a log box just show it else create one   
  if(document.getElementById("log_box") == null){
    CreateLogin(apiUrl);
  }else{
    document.getElementById("log_box").style.display="inline";
  }

}


function SIGN(apiUrl){ // hide the "feed" and pop login box

  // check if sign box is showing 
  // when jump direct form SIGN UP  to LOG IN
  if(document.getElementById("log_box") != null){   
      document.getElementById("log_box").style.display="none";
  }

    CleanWeb();  // hide the main page

  // if there is a sign box just show it else create one   
  if(document.getElementById("sign_box") == null){
    CreateSign(apiUrl);
  }else{
    document.getElementById("sign_box").style.display="inline";
  }

}


function CleanWeb(){
  document.getElementById("feed").style.display="none";
}


function CreateLogin(apiUrl){      //// create all the thing we need for login section 
  let head = document.createElement("div");  // the parent div node contains two container(input and cancel button);
  head.id = "log_box";
  document.body.appendChild(head);

  // initialize two container to hold Username and password 
  let container1 = document.createElement("div");
  let container2 = document.createElement("div");
  container1.id = "ct1";
  container2.id = "ct2";
  head.appendChild(container1);
  head.appendChild(container2);


  let un_lab = document.createElement("label");         // initialize  Username input 
    un_lab.element_id = "uname"; // username
    un_lab.innerText = "Username";
  let Username = document.createElement("input");
    Username.id = "use_placeholder";
    Username.className = "placeholder";
    Username.setAttribute("type", "text");
    Username.setAttribute("placeholder", "Enter Username");
    Username.setAttribute("name", "Enter uname");
  container1.appendChild(un_lab);                     // the text
  container1.appendChild(Username);                   //the placeholder
  
    let pw_lab = document.createElement("label");  
      pw_lab.element_id ="psw"; 
      pw_lab.innerText = "Password     ";
    let Password = document.createElement("input");
      Password.id ="pas_placeholder";
      Password.className = "placeholder";
      Password.setAttribute("type", "password");
      Password.setAttribute("placeholder", "Enter Password");
      Password.setAttribute("name","psw")
  
  container1.appendChild(pw_lab)        // the text
  container1.appendChild(Password); // the placehoder

//// the back  and submmit in button  add to container2
  let back_button = document.createElement("button");       // the back button
  back_button.className = "backbtn";
  back_button.innerText = "Back";
  container2.appendChild(back_button);  
// add eventlistener to back button
  back_button.addEventListener("click",function(){  
      document.getElementById("feed").style.display="inline";
      document.getElementById("log_box").style.display="none";
  })

  let submmit_button = document.createElement("button");     // the submit button
  submmit_button.className = "submitbtn";
  submmit_button.innerText = "Submit";
  container2.appendChild(submmit_button);  

//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//add eventListener to submmit button
  submmit_button.addEventListener("click",function(){    
      var options =     // the fetch option 
      {
          method: "POST",
          body: JSON.stringify({"username":Username.value,"password":Password.value}),
          headers:{"Content-Type":"application/json"},
      };

      let status ;  // use to record the respose status
      
      fetch(`${apiUrl}/auth/login`, options)               // try to login and get token
      .then( response => {
        status = response.status;
        return response.json() 
      })
      .then( json => {
        if(status == 403){                                 //Invalid Username/Password
          Username.value = "";
          Password.value = "";
          alert("Invalid Username/Password");
        
        }else if(status == 400){                          //	Missing Username/Password
          alert("Missing Username/Password");
        }else {
                                                        // get token and save it in localStorage
          localStorage.setItem ('token',json.token);
          document.getElementById("post_public").style.display = "none";
          post_user(apiUrl);     // login sucessusfully and output
        }
      })
    
    })  
  }


function CreateSign(apiUrl){

  let head = document.createElement("div");
  head.id ="sign_box";
  document.body.appendChild(head);

  let contain_one = document.createElement("label");   // use to put USER name and password
  let contain_two = document.createElement("label");   // use to put sign button and back 

  contain_one.id = "sct1";
  contain_two.id = "sct2";
  head.appendChild(contain_one);
  head.appendChild(contain_two);        /// append these two containner to page

    let sg_lab =document.createElement("label");
      sg_lab.element_id ="sname";
      sg_lab.innerText = "Sign up Username";
    let Username = document.createElement("input");
      Username.id = "sname";
      Username.className = "placeholder";
      Username.setAttribute("type", "text");
      Username.setAttribute("placeholder", "Enter Username");
  contain_one.appendChild(sg_lab);  // the text for Username input 
  contain_one.appendChild(Username);  //the placeholder  for username 
  
    let pw_lab = document.createElement("label");
      pw_lab.element_id="spsw";
      pw_lab.innerText = "Password";
    let Password = document.createElement("input");
      Password.id = "Spas_placeholder";
      Password.className = "placeholder";
      Password.setAttribute("type","password");
      Password.setAttribute("placeholder","Enter Password");
  contain_one.appendChild(pw_lab);         // text for Password
  contain_one.appendChild(Password);       // placeholder  for Password

  let rn_lab = document.createElement("label");
    rn_lab.innerText = "Enter Your Content Name";
  let Realname = document.createElement("input");
    Realname.id = "rn_placeholder";
    Realname.className = "placeholder";
    Realname.setAttribute("type","text");
    Realname.setAttribute("placeholder","Enter You Name");
  contain_one.appendChild(rn_lab);         // text for real name
  contain_one.appendChild(Realname);       // placeholder  for real name

  let em_lab = document.createElement("label");
    em_lab.innerText = "Enter Your Content Email";
  let Email = document.createElement("input");
    Email.id = "rn_placeholder";
    Email.className = "placeholder";
    Email.setAttribute("type","text");
    Email.setAttribute("placeholder","Enter You Email");
  contain_one.appendChild(em_lab);         // text for email
  contain_one.appendChild(Email);       // placeholder  for email


  ///////////////////////////////////////////////////////////////////////
  // container two   SIGN button and Back button
  let back_button = document.createElement("button");    // BACK button
    back_button.addEventListener("click",function(){
      document.getElementById("feed").style.display = "inline";
      document.getElementById("sign_box").style.display ="none";
    })
      back_button.className = "backbtn";
      back_button.innerText = "Back";
    contain_two.appendChild(back_button);

  // SIGN button 
    let sign_button = document.createElement("button");
      sign_button.addEventListener("click",function(){
        alert("try to sign");
        
        var options =     // the fetch option 
        {
            method: "POST",
            body: JSON.stringify({"username":Username.value,"password":Password.value,"email":Email.value,"name":Realname.value}),
            headers:{"Content-Type":"application/json"},
        };
  
        let status ;  // use to record the respose status
        fetch(`${apiUrl}/auth/signup`, options)
        .then( response => {
          status = response.status;
          return response.json() 
        })
        .then( json => {
          // console.log(status);  check if the status is right
          if(status == 409){ //Invalid Username/Password
            //Username.value = "";
            //Password.value = "";
            alert("Username Taken. Please choose another name");
          }else if(status == 400){  //	Missing Username/Password
            alert("Malformed Request");
          }else {
            localStorage.setItem ('token',json.token);
            document.getElementById("post_public").style.display = "none";
            post_user(apiUrl);     // login sucessusfully and output
          }
        })

      })
      sign_button.className = "signbtn";
      sign_button.innerText = "SIGN UP";
      contain_two.appendChild(sign_button);
} 


function post_public(apiUrl){

  var options =     // the fetch option 
  {
      method: "GET",
      headers:{"Content-Type":"application/json"},
  };

  fetch(`${apiUrl}/post/public`, options)
  .then(function(response) { return response.json(); })
  .then(function(data) {
  
    const holder = document.createElement("div");    // use to hold all the post form fetch 
    holder.id = "post_public";
    const exitst_post = document.getElementsByClassName("post");
    document.getElementById("feed").insertBefore(holder,exitst_post[0]);
  
    // find latest post and pop them out one by one
    
    while(data.posts.length != 0){         //when post is not empty

      let latest_index = 0;
      let latest_published = 0;
      for (let i = 0; i < data.posts.length; i++) {         // find latest post
        if(data.posts[i].meta.published > latest_published){
          latest_index = i;
          latest_published = data.posts[i].meta.published;
        }
      }
  
      // <li data-id-post> 
      let post = document.createElement("li");
        post.attributeName = "data-id-post";
        post.setAttribute("data-id-post","");        
        post.className = "post";

      //<div data-id-vote> use to store information of upvote
      let vote = document.createElement("div");
        vote.className ="vote";
        vote.setAttribute ("data-id-upvotes","");
      let vtNumber = document.createTextNode(data.posts[latest_index].meta.upvotes.length);
        vote.appendChild(vtNumber);
      
      //<div> content as a holder for titile,author, text
      let content = document.createElement("div");
        content.className = "content";
      let ct_title = document.createElement("h4");  // title
        ct_title.setAttribute("data-id-title","");
        ct_title.className = "post-title alt-text";
        ct_title.innerText = data.posts[latest_index].title;
      let ct_at = document.createElement("p");      // author
        ct_at.setAttribute("data-id-author","");
        ct_at.className = "post-author";
        let node = document.createTextNode("Posted by @" + data.posts[latest_index].meta.author);
        ct_at.appendChild(node);
      let describe = document.createElement("p");  // describe text
        describe.classList = "short-dis";
        let text = document.createTextNode(data.posts[latest_index].text);
        describe.appendChild(text);
      let CommNumber = document.createElement("p"); // comment number
        CommNumber.classList = "cmn";
        let commts = document.createTextNode("#Comments: "+ data.posts[latest_index].comments.length); 
        CommNumber.appendChild(commts);
      let subseddit = document.createElement("p"); // subseddit
        subseddit.classList = "subseddit";
        let subs = document.createTextNode("/"+ data.posts[latest_index].meta.subseddit)
        subseddit.appendChild(subs);

      // append to the content <div>
      content.appendChild(subseddit);
      content.appendChild(ct_title);
      content.appendChild(describe);
      content.appendChild(ct_at);
      content.appendChild(CommNumber);

      post.appendChild(vote);
      post.appendChild(content);
      
      holder.appendChild(post);      
    
      data.posts.splice(latest_index,1); // pop off this post form array 
    }
    
    });  
  }
  
  
function post_user(apiUrl){
  let status ;  // use to record the respose status
  let token = localStorage.getItem('token');  // get user's token 

  let options =     // the fetch option 
  {
      method: "GET",
      headers:{
        "Authorization":"Token "+token,
      },
  };

  fetch(`${apiUrl}/user/feed`, options)
  .then( response => {
    status = response.status;
    return response.json()  
  })
  .then(function(data) {  
    if(status == 403){                                  //Invalid Auth Token
      alert("Invalid Auth Token");
    }else {
      const holder = document.createElement("div");    // use to hold all the post form fetch 
      holder.id = "post_user";
      document.getElementById("feed").appendChild(holder);
    
      while(data.posts.length != 0){                    // pop post when the post array is not empty
        let latest_index = 0;
        let latest_published = 0;
        for (let i = 0; i < data.posts.length; i++) {   // find latest post
          if(data.posts[i].meta.published > latest_published){
            latest_index = i;
            latest_published = data.posts[i].meta.published;
          }
        }
    
        // <li data-id-post> 
        // main container post
        //root / user/ post
        let post = document.createElement("li");
          post.attributeName = "data-id-post";
          post.setAttribute("data-id-post","");        
          post.className = "post";
  
        //<div data-id-vote> use to store information of upvote
        let vote = document.createElement("div");
          vote.className ="vote";
          vote.setAttribute ("data-id-upvotes","");
        let vtNumber = document.createTextNode(data.posts[latest_index].meta.upvotes.length);
          vote.appendChild(vtNumber);
        
          //<div> content as a holder for titile,author, text
        let content = document.createElement("div");
          content.className = "content";
        let ct_title = document.createElement("h4");  // title
          ct_title.setAttribute("data-id-title","");
          ct_title.className = "post-title alt-text";
          ct_title.innerText = data.posts[latest_index].title;
        let ct_at = document.createElement("p");      // author
          ct_at.setAttribute("data-id-author","");
          ct_at.className = "post-author";
          let node = document.createTextNode("Posted by @" + data.posts[latest_index].meta.author);
          ct_at.appendChild(node);
        let describe = document.createElement("p");  // describe text
          describe.classList = "short_dis";
          let text = document.createTextNode(data.posts[latest_index].text);
          describe.appendChild(text);
        let CommNumber = document.createElement("p"); // comment number
          CommNumber.classList = "cmn";
          let commts = document.createTextNode("#Comments: "+ data.posts[latest_index].comments.length); 
          CommNumber.appendChild(commts);
        let subseddit = document.createElement("p"); // subseddit
          subseddit.classList = "subs";
          let subs = document.createTextNode("/"+ data.posts[latest_index].meta.subseddit)
          subseddit.appendChild(subs);
  
        // append to the content <div>
        content.appendChild(subseddit);
        content.appendChild(ct_title);
        content.appendChild(describe);
        content.appendChild(ct_at);
        content.appendChild(CommNumber);
  
        post.appendChild(vote);
        post.appendChild(content);
        
        holder.appendChild(post);      
      
        data.posts.splice(latest_index,1); // pop off this post from array 
      }      
   
      alert("LOG IN ! PLEASE CLICK BUCK BUTTON"); //finish post 
    }
  })  
}  




export default initApp;