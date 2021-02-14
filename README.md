# Cats Website

The **Cats Website** uses [The Cat API](https://docs.thecatapi.com/) and displays all cats by breed and other information such as temperament, origin, and description.

The website has two pages:

1. the home page, and
1. the details page

## Cats Home Page

![Cats Home Page](../media/catBrowser_home.png)

When the page is loaded, the dropdown element is populated by the list of **cat breeds** is fetched from [The Cat API](https://docs.thecatapi.com/).

After a breed is selected, images of cats of this breed will be displayed in random order. Paging is applied.

- Maximum of 10 items is displayed (`limit=10`)
- User will have the option to **load more** items
- The _load more_ button will disappear if there are no items left to be loaded

Clicking the **View Details** button redirects the user to the Details page.

## Details Page

![Cats Details Page](../media/catBrowser_details.png)

This page shows the following information about the selected item

- Cat id (in the URL)
- Full image
- Breed
- Breed description
- Temperament

Clicking the **Back button** will redirect to the Home page with the **selected breed pre-loaded**.

### Breadcrumb

Added on the top-left portion of this page to quickly show the selected **breed** at a glance. This is specifically helpful if the cat's image is quite large and scrolling is necessary to see the selected breed.

Clicking the **Home link** will redirect to the first page _without_ the breed pre-selected.

## Error Handling

![Cats Website Error Handling](../media/catBrowser_error.png)

An error message is displayed if there are issues with connecting or fetching from the API.

## Installation

`npm install` or `yarn install`
