import { Component, OnInit } from '@angular/core';
import {search} from "ionicons/icons";
import { StorageService } from '../../../services/storage.service';

interface WikipediaArticle {
  title: string;
  extract: string;
  url: string;
  content: string;
}

interface Article {
  id: number;
  title: string;
  subtitle: string;
  content: string;
}

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit {
  isModalOpen = false;


  title:string = "";
  subtitle:string = "";
  content:string = "";

  articles: Article[] = [];


  constructor(
    private storageService: StorageService,
  ) { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;

  }

  // Setea el articulo actual
  setArticle(title: string, subtitle: string, content: string) {
    this.title = title;
    this.subtitle = subtitle;
    this.content = content;
  }

  // Agrega un articulo a la lista de articulos
  addArticle(title: string, subtitle: string, content: string) {
    let titles = this.articles.map((article) => article.title);
    if (title == "" || subtitle == "" || content == "") {

    } else {
      if (titles.includes(title)) {
        console.log("Title already exists")
      } else {
        this.articles.push({
          id: this.getLastArticleId() + 1,
          title: title,
          subtitle: subtitle,
          content: content,
        })
        // Agrega persistencia a los articulos
        this.persistArticles();
      }
    }
  }

  // Abre un articulo guardado
  openSavedArticle(id: number) {
    let article = this.articles.find((article) => article.id === id);
    if (article) {
      this.setArticle(article.title, article.subtitle, article.content)
      this.setOpen(true);
    }
  }

  // Borra un articulo guardado
  deleteSavedArticle(id: number) {
    let article = this.articles.find((article) => article.id === id);
    if (article) {
      this.articles.splice(this.articles.indexOf(article), 1);
      // Actualiza los articulos guardados en el local storage
      this.persistArticles();
    }
  }

  // Devuelve el id del ultimo articulo
  getLastArticleId():number {
    let lastArticle = this.articles[this.articles.length - 1];
    if (lastArticle) {
      return lastArticle.id;
    } else {
      return 0;
    }
  }

  // Persiste los articulos en el local storage
  persistArticles() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
    this.storageService.set('articles', this.articles);
  }

  // Busca un articulo en wikipedia
  async fetchWikipediaArticle(searchTerm: string): Promise<WikipediaArticle | null> {
    let savedArticles = this.articles.map((article) => article.title);

    if (savedArticles.includes(searchTerm)) {
        let article = this.articles.find((article) => article.title === searchTerm);
        if (article) {
            this.setArticle(article.title, article.subtitle, article.content)
            this.setOpen(true);
        }
        return null;

    } else {
      const response = await fetch(`https://wiki-api.sebas.lat/a/${searchTerm}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
      );

      if (response.status === 200) {
        const data = await response.json();
        const pages = data.query.pages;
        const articleId = Object.keys(pages)[0];
        const articleData = pages[articleId];
        const articleContent = articleData.revisions[0]['*'];
        const articleUrl = `https://es.wikipedia.org/wiki/${articleData.title}`;

        // Esto es para limpiar el contenido del artículo
        const cleaned = articleContent
            .replace(/\{\{[^\}]+\}\}/g, '')
            .replace(/<\/?[^>]+(>|$)/g, '')
            .replace(/&nbsp;/g, '')
            .replace(/\[\d+\]/g, '')
            .replace(/\|/g, '')
            .replace(/\[\[/g, '')
            .replace(/\]\]/g, '')
            .replace(/=/g, '')
            .replace(/'/g, '')
            .replace(/_/g, '')
        ;

        this.setArticle(articleData.title, articleUrl, cleaned)

        return {
          title: articleData.title,
          extract: articleData.extract,
          url: `https://en.wikipedia.org/wiki/${articleData.title}`,
          content: articleContent,
        };
      } else {
        return null;
      }
    }


  }

  async ngOnInit() {
    // Carga los articulos guardados
    const articles = localStorage.getItem('articles');
    const storageArticles = this.storageService.get('articles');
    if (articles) {
      this.articles = JSON.parse(articles);
    }
  }

  // Llama a la funcion fetchWikipediaArticle cuando se presiona enter
  pressKey(input: string | null | undefined) {
    if (input) {
      console.log(input)
        this.fetchWikipediaArticle(input).then(
          (article) => {
          if (article) {
            console.log(article);
            this.setOpen(true);
          } else {
            console.log('No article found');
          }
        }
        );
    }
  }

  // Guarda el articulo en la lista de articulos guardados
  saveArticle() {
    console.log("save article")
    this.addArticle(this.title, this.subtitle, this.content)
    this.setOpen(false);
  }

  protected readonly search = search;
}
