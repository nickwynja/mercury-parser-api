const EconomistExtractor = {
  domain: 'www.economist.com',

  title: {
    selectors: ['h1 span[class*="article__headline"]'],
  },

  author: {
    selectors: [['meta[itemprop="author"]', 'value']],
  },

  date_published: {
    selectors: [['time', 'datetime']],
  },

  dek: {
    selectors: ['p[class*="article__description"]'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div[class*="layout-article-body"]'],

    transforms: {},

    clean: ['.layout-article-links'],
  },
};

const GqExtractor = {
  domain: 'www.gq.com',

  title: {
    selectors: ['h1.content-header__hed'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: ['time[class="content-header__publish-date"]'],
  },

  dek: {
    selectors: ['div[class*="content-header__dek"]'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div[class*="content-background"]'],

    transforms: {
      noscript: 'div',
    },

    clean: ['aside[class*="pullquote-embed"'],
  },
};

const NewYorkerExtractor = {
  domain: 'www.newyorker.com',
  title: {
    selectors: [
      'h1[class^="ArticleHeader__hed"]',
      ['meta[name="og:title"]', 'value'],
      'h1[class^="content-header__hed"]',
    ],
  },

  author: {
    selectors: [
      'div[class^="ArticleContributors"] a[rel="author"]',
      'article header div[class*="Byline__multipleContributors"]',
      'div[class="content-header__byline__content"] span[class*="byline__name"]',
    ],
  },

  content: {
    selectors: [
      'article[class*="main-content"] div[data-attribute-verso-pattern="article-body"]',
    ],

    transforms: {
      noscript: 'div',
    },

    clean: [
      'footer[class^="ArticleFooter__footer"]',
      'div[class*="social-icons"]',
      'figure[data-testid*="IframeEmbed"]',
      'div[data-testid*="GenericCallout"]',
    ],
  },

  date_published: {
    selectors: ['time[class*="__publish-date"]'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [
      ['meta[name="description"]', 'value'],
      'p[class*="header__dek"]',
    ],
  },

  next_page_url: null,

  excerpt: null,
};

const NYTimesExtractor = {
  domain: 'www.nytimes.com',

  title: {
    selectors: [
      'h1.g-headline',
      'h1[itemprop="headline"]',
      'h1.headline',
      'h1 .balancedHeadline',
    ],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
      '.g-byline',
      '.byline',
      ['meta[name="byl"]', 'value'],
    ],
  },

  content: {
    selectors: ['div.g-blocks', 'section[name="articleBody"]', 'article#story'],

    transforms: {
      'img.g-lazy': $node => {
        let src = $node.attr('src');
        const width = 640;

        src = src.replace('{{size}}', width);
        $node.attr('src', src);
      },
      figure: ($node, $) => {
        // const imgCaption = $node.find('figcaption');
        const imgSrc = $node.attr('itemid');
        const imgContainer = $node.find(
          'div[data-testid="lazyimage-container"]'
        );
        const $img = $('<img />').attr('src', imgSrc);
        const figChild = $node
          .children()
          .children()
          .first();
        if (figChild.text() === 'Image') {
          figChild.remove();
        }
        imgContainer.replaceWith($img);
      },
      h2: $node => {
        // The "id" attribute values would result in low scores and the element being
        // removed.
        $node.attr('id', null);
        $node.attr('class', null);

        // A subsequent h3 will be removed if there is not a paragraph before it, so
        // add a paragraph here. It will be removed anyway because it is empty.
        $node.before('<p></p>');

        // h1 elements will be demoted to h2, so demote h2 elements to h3.
        return 'h3';
      },
      h1: $node => {
        // The "id" attribute values would result in low scores and the element being
        // removed.
        $node.attr('id', null);
        $node.attr('class', null);

        // A subsequent h2 will be removed if there is not a paragraph before it, so
        // add a paragraph here. It will be removed anyway because it is empty.
        $node.after('<p></p>');
      },
    },

    clean: [
      '.ad',
      'header#story-header',
      '.story-body-1 .lede.video',
      '.visually-hidden',
      '#newsletter-promo',
      '.promo',
      '.comments-button',
      '.hidden',
      '.comments',
      '.supplemental',
      '.nocontent',
      '.story-footer-links',
      '#styln-faq-coronavirus',
    ],
  },

  date_published: {
    selectors: [['meta[name="article:published"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="description"]', 'value']],
  },

  next_page_url: null,

  excerpt: null,
};

const TheAtlanticExtractor = {
  domain: 'www.theatlantic.com',
  title: {
    selectors: ['h1', '.c-article-header__hed'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value'], '.c-byline__author'],
  },

  content: {
    selectors: ['article', '#main-article', '.article-body'],

    transforms: [],

    clean: [
      'div[class^="ArticleLeadArt"]',
      'article>header',
      '.c-article-header',
      '.c-lead-media',
      '.partner-box',
      '.callout',
      '.c-article-writer__image',
      '.c-article-writer__content',
      '.c-letters-cta__text',
      '.c-footer__logo',
      '.c-recirculation-link',
      '.twitter-tweet',
    ],
  },

  dek: {
    selectors: [['meta[name="description"]', 'value']],
  },

  date_published: {
    selectors: [['time[itemprop="datePublished"]', 'datetime']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  next_page_url: null,

  excerpt: null,
};

const WiredExtractor = {
  domain: 'www.wired.com',
  title: {
    selectors: [
      'h1.post-title',
      'h1[data-testid="ContentHeaderHed"]',
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      'a[rel="author"]',
      ['meta[name="author"]', 'value'],
      // enter author selectors
    ],
  },

  content: {
    selectors: [
      'article.content',
      'article.main-content',
      // enter content selectors
    ],

    transforms: [],

    clean: [
      '.visually-hidden',
      'figcaption img.photo',
      '.article__series-navigation',
    ],
  },

  date_published: {
    selectors: [
      ['meta[itemprop="datePublished"]', 'value'],
      'time[data-testid="ContentHeaderPublishDate"]',
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [],
  },

  next_page_url: null,

  excerpt: null,
};

const PaulGrahamExtractor = {
  domain : 'paulgraham.com',
  author: "Paul Graham",
  content: {
    selectors: [
      ['table table font']
    ],

    defaultCleaner: false,

    transforms: {
      table: 'div',
    },
  }
};

const LinkedInExtractor = {
  domain : 'linkedin.com',
  defaultCleaner: false,

  content: {
    selectors: [
      ['section.mb-3 > article > div.attributed-text-segment-list__container.relative > p'],
    ],

    clean: [
      '.comment',
      '.comment-with-action',
      '.comment__text',
      'section.related-posts'
    ],


  }
};


function customize(parser) {
  parser.addExtractor(EconomistExtractor);
  parser.addExtractor(GqExtractor);
  parser.addExtractor(NewYorkerExtractor);
  parser.addExtractor(NYTimesExtractor);
  parser.addExtractor(TheAtlanticExtractor);
  parser.addExtractor(WiredExtractor);
  parser.addExtractor(PaulGrahamExtractor);
  parser.addExtractor(LinkedInExtractor);
}

module.exports = { customize };

console.log('Loaded custom extractors');
