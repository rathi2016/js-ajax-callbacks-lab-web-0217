function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function searchRepositories(){
  // const searchTerms = $('#searchTerms').val()
  const searchTerms = document.getElementById("searchTerms").value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`,data => {
    const src = $('#results-template').html()
    const template = Handlebars.compile(src)
    const repoList = template(data)
    $('#results').html(repoList)
  }).fail(error => {
    displayError()
  })
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`,data => {
    const src = $('#commits-template').html()
    const template = Handlebars.compile(src)
    $('#details').html(template(data))
  }).fail(error => {
    displayError()
  })
}

function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});
