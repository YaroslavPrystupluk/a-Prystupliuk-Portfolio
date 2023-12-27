class RepoCard {
		constructor( username ) {
				this.username = username;
				this.apiUrl = `https://api.github.com/users/${username}/repos`;
				this.section = document.querySelector(".repo");
		}
		
		async getGitHubRepos() {
			const response = await fetch( this.apiUrl );
						if ( !response.ok ) {
								throw new Error( `Failed to fetch repository: ${ response.statusText }` );
						}
						return await response.json();
				}
		
		async displayRepos(){
				const repos = await this.getGitHubRepos();
				repos.forEach((repo) => {
						if(repo.description === null){
								repo.description = "No description provided";
						}
						if(repo.homepage === "" ){
								repo.homepage = "No home page provided";
						}
						this.section.insertAdjacentHTML("beforeend",
							`<div class="card" data-aos="fade-up">
<div>
		<i class="fa-brands fa-github icon-repo"></i>
		<a class="card-title" href="${ repo.html_url }" target="_blank">${ repo.name }</a>
		</div>
		
		<div>
		<i class="fa-solid fa-globe icon-repo"></i>
		<a class="card-page" href="${ repo.homepage }" target="_blank">${ repo.homepage }</a>
		</div>
		
		<div>
		<i class="fa-solid fa-audio-description icon-repo"></i>
		<span class="card-description">${ repo.description }</span>
		</div>
		
		<div>
		<i class="fa-solid fa-circle icon-circle"></i>
		<span class="card-language">${ repo.language }</span>
		<i class="fa-regular fa-star icon-repo"></i>
		<span class="card-star">${ repo.stargazers_count }</span>
		</div>
	</div>`);
				
				});
		
		}
}

export default RepoCard;