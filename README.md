Application Cart data-Model:

1. Order beolongs to seller - Different items from same seller will be grouped under seller id.
2. Buyer-id can be used to pull all my orders.
2. Every order has buyer-id, seller-id and fooditem-id. This information will be used to create chat room.
    - Chat room can be fooditem specific or seller specific or order specific

app-cart/<buyer-id>/orders/<seller-id>/items/<fooditem-id>

Order-History: Move all completed and cancelled orders to history, with an option of reorder, if the item still exist in the list.

1. Sign-In with google.
2. Store data returned by google provider -
    displayName
    PhotoURL
3. Gather user about info...
4. Confirm user address...