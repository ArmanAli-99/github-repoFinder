//Change the theme
const themeStyle = document.getElementById("theme-style")
const colourMode = document.getElementById("colour-mode")
const searchUser = document.getElementById("search-user")
const search = document.getElementById("search")
let errorMessage = document.getElementById("error-message")
let userImage = document.querySelector(".profile-img img")
let userTittle = document.querySelector(".profile h1")
let userName = document.querySelector(".profile a")
let joinedDate = document.querySelector(".profile small")
let bio = document.getElementById("bio")
let repo = document.querySelector(".data-info .data-section #repo")
let followers = document.querySelector(".data-info .data-section #followers")
let following = document.querySelector(".data-info .data-section #following")
let userLocation = document.querySelector(".social-media .social-link #location")
let company = document.querySelector(".social-media .social-link #company")
let email = document.querySelector(".social-media .social-link #email")
let twitter_username = document.querySelector(".social-media .social-link #twitter")



//Default User
const defaultUser = "Octocat"


colourMode.addEventListener("click",()=>{
    if (themeStyle.getAttribute("href")=="#") {
        themeStyle.setAttribute("href","styles/dark.css")  
    }else{
        themeStyle.setAttribute("href","#")
    }
})

//Take input from user
searchUser.addEventListener("submit",(e)=>{
    const user = search.value
    console.log(user);
    getGithubUserDetail(user)
})

function getGithubUserDetail(username) {
    fetch(`https://api.github.com/users/${username}`)
    .then((res)=>res.json())
    .then((data)=>{
        if(data["message"]==="Not Found"){
            console.log(data)
            errorMessage.style.display = "inline-block"
        }else{
            if (errorMessage.style.display = "inline-block") {
                errorMessage.style.display = "none"
                console.log(data);
            }
            userImage.src = data.avatar_url
            userTittle.innerText = data.name == null? username : data.name
            userName.href = data.html_url
            userName.innerHTML = `@${username}`
            const date = new Date(data.created_at).toDateString().slice(3,16)
            joinedDate.innerText = `joined at ${date}`
            

            data.bio==null? bio.innerHTML=`This profile has no bio` : bio.innerHTML = `${data.bio}`

            repo.innerHTML = `${data.public_repos}`
            followers.innerHTML = `${data.followers}`
            following.innerHTML = `${data.following}`

            data.location==null? userLocation.innerHTML=`Not Provide` : userLocation.innerHTML = `${data.location}`

            data.company==null? company.innerHTML=`Not Provide` : company.innerHTML = `${data.company}`

            data.email==null? email.innerHTML=`Not Provide` : email.innerHTML = `${data.email}`

            data.twitter_username ==null? twitter_username .innerHTML=`Not Provide` : twitter_username .innerHTML = `${data.twitter_username }`

        }
    });

}
getGithubUserDetail(defaultUser)