import { Component, OnInit } from '@angular/core';
import {search} from "ionicons/icons";


interface WikipediaArticle {
  title: string;
  extract: string;
  url: string;
}
@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit {


  constructor() { }

  async getArticle(name: string) {
    const url: string = "https://es.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=";

    const response = await fetch(url + name, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8100'

  },
    });

    const article = await response.json();
    console.log(article);


  }

  async fetchWikipediaArticle(searchTerm: string): Promise<WikipediaArticle | null> {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exchars=200&titles=${searchTerm}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://app.sebas.lat'
      },
    }
    );

    if (response.status === 200) {
      const data = await response.json();
      const pages = data.query.pages;
      const articleId = Object.keys(pages)[0];
      const articleData = pages[articleId];

      return {
        title: articleData.title,
        extract: articleData.extract,
        url: `https://en.wikipedia.org/wiki/${articleData.title}`,
      };
    } else {
      return null;
    }
  }

  ngOnInit() {
  }

  pressKey(input: string | null | undefined) {
    if (input) {
      console.log(input)
        this.fetchWikipediaArticle(input).then((article) => {
          if (article) {
            console.log(article);
          } else {
            console.log('No article found');
          }
        }
        );
    }

  }

  protected readonly search = search;
}
