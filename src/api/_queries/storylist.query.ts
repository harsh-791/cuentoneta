import { authorForStoryCard } from './author.query';

const storylistTagsQuery = `
    'tags': tags[] -> {
        title, 
        'slug': slug.current, 
        description, 
        'icon': {'name': icon.name, 'provider': icon.provider, 'svg': icon.svg}
    }
`;

const gridConfigQuery = (config: 'previewGridConfig' | 'gridConfig') => `
'gridConfig': { 
    'gridTemplateColumns': ${config}.gridTemplateColumns,
    'titlePlacement': ${config}.titlePlacement,
    'cardsPlacement': ${config}.cardsPlacement[]
    {
        'order': order,
        'slug': publication.story->slug.current,
        'startCol': startCol,
        'image': image,
        'imageSlug': imageSlug.current,
        'endCol': endCol,
        'startRow': startRow,
        'endRow': endRow,
        'publication': {
            'publishingOrder': publication.publishingOrder,
            'publishingDate': publication.publishingDate,
            'published': publication.published,
            'story': publication.story->{
                _id,
                'slug': slug.current,
                title,
                badLanguage,
                categories,
                body[0...3],
                review,
                approximateReadingTime,
                language,
                mediaSources,
            	${authorForStoryCard}
            }
        }
    }
}
`;

export const storylistCardQuery = `
{ 
    _id,
    'slug': slug.current,
    title,
    description,
    language,
    displayDates,
    editionPrefix,
    comingNextLabel,
    ${storylistTagsQuery},
    featuredImage,
    'count': count(*[ _type == 'publication' && storylist._ref == ^._id ])
}
`;

export const storylistPreviewQuery = `
{ 
    _id,
    'slug': slug.current,
    title,
    description,
    language,
    displayDates,
    editionPrefix,
    comingNextLabel,
    ${storylistTagsQuery},
    featuredImage,
    ${gridConfigQuery('previewGridConfig')},
    'count': count(*[ _type == 'publication' && storylist._ref == ^._id ])
    }
`;

export const storylistQuery = `
{ 
    _id,
    'slug': slug.current,
    title,
    description,
    language,
    displayDates,
    editionPrefix,
    comingNextLabel,
    featuredImage,
    ${storylistTagsQuery},
    ${gridConfigQuery('gridConfig')},
    'count': count(*[ _type == 'publication' && storylist._ref == ^._id ])
}
`;
