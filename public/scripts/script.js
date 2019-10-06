function openSlideMenu(number){
    let sideNavs = document.getElementsByClassName('side-nav');
    for(let i = 0; i < sideNavs.length; i++){
        sideNavs[i].style.width = '0';
    }
    sideNavs[number].style.width = '20rem';
}

function closeSlideMenu(number){
    document.getElementsByClassName('side-nav')[number].style.width = '0';
}

