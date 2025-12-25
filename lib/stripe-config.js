export const STRIPE_PLANS = {
    // SUBSCRIPTIONS (Monthly)
    starter: {
        name: 'Starter',
        priceId: 'price_1SfQgGKFRd9JfwYZSsiZWosA', // €19/mnd
        credits: 50,
        price: '€19',
        mode: 'subscription'
    },
    pro: {
        name: 'Vakman',
        priceId: 'price_1SfQgiKFRd9JfwYZyy207Mwe', // €29/mnd (Most Popular)
        credits: 90,
        price: '€29',
        mode: 'subscription'
    },
    baas: {
        name: 'Aannemer',
        priceId: 'price_1SfQi0KFRd9JfwYZ80ytVcoJ', // €59/mnd
        credits: 250,
        price: '€59',
        mode: 'subscription'
    },
    // ONE-TIME PACKS (Top-ups)
    nood: {
        name: 'Noodrantsoen',
        priceId: 'price_1SfQiFKFRd9JfwYZlqHczUPR', // €5
        credits: 10,
        price: '€5',
        mode: 'payment'
    },
    tank: {
        name: 'Tankbeurt',
        priceId: 'price_1SfQifKFRd9JfwYZDCnKlT2k', // €19
        credits: 45,
        price: '€19',
        mode: 'payment'
    },
    voorraad: {
        name: 'De Voorraad',
        priceId: 'price_1SfPuiKFRd9JfwYZxfYqg60H', // €39
        credits: 100,
        price: '€39',
        mode: 'payment'
    }
};
