# Inventory Upload  __

## Add inventory __

Add inventory

POST

`/inventory/upload/add`

Upload a CSV of listings to add to your inventory.

### File structure Â¶

The file you upload must be a comma-separated CSV. The first row must be a header with lower case field names.

Hereâs an example:
    
    
    release_id,price,media_condition,comments
    123,1.50,Mint (M),Comments about this release for sale
    456,2.50,Near Mint (NM or M-),More comments
    7890,3.50,Good (G),Signed vinyl copy

### Things to note: Â¶

These listings will be marked âFor Saleâ immediately. Currency information will be pulled from your marketplace settings. Any fields that arenât optional or required will be ignored.

### Required fields Â¶

  * `release_id` \- Must be a number. This value corresponds with the Discogs database Release ID.

  * `price` \- Must be a number.

  * `media_condition` \- Must be a valid condition (see below).

### Optional fields Â¶

  * `sleeve_condition` \- Must be a valid condition (see below).

  * `comments` `accept_offer` \- Must be Y or N.

  * `location` \- Private free-text field to help identify an itemâs physical location.

  * `external_id` \- Private notes or IDs for your own reference.

  * `weight` \- In grams. Must be a non-negative integer.

  * `format_quantity` \- Number of items that this item counts as (for shipping).

### Conditions Â¶

When you specify a media condition, it must exactly match one of these:

  * `Mint (M)`

  * `Near Mint (NM or M-)`

  * `Very Good Plus (VG+)`

  * `Very Good (VG)`

  * `Good Plus (G+)`

  * `Good (G)`

  * `Fair (F)`

  * `Poor (P)`

Sleeve condition may be any of the above, or:

  * `Not Graded`

  * `Generic`

  * `No Cover`

  * **Parameters**
  * upload
    `file` (required)

The CSV file of items to add to your inventory.

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        Location: https://api.discogs.com/inventory/upload/599632  
        

  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`409`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`415`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`422`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

## Change inventory  __

Change inventory

POST

`/inventory/upload/change`

Upload a CSV of listings to change in your inventory.

### File structure Â¶

The file you upload must be a comma-separated CSV. The first row must be a header with lower case field names.

Hereâs an example:
    
    
    release_id,price,media_condition,comments
    123,1.50,Mint (M),Comments about this release for sale
    456,2.50,Near Mint (NM or M-),More comments
    7890,3.50,Good (G),Signed vinyl copy

### Things to note: Â¶

These listings will be marked âFor Saleâ immediately. Currency information will be pulled from your marketplace settings. Any fields that arenât optional or required will be ignored.

### Required fields Â¶

  * `release_id` \- Must be a number. This value corresponds with the Discogs database Release ID.

## Optional fields (at least one required) Â¶

  * `price` -

  * `media_condition` \- Must be a valid condition (see below).

  * `sleeve_condition` \- Must be a valid condition (see below).

  * `comments`

  * `accept_offer` \- Must be Y or N.

  * `external_id` \- Private notes or IDs for your own reference.

  * `location` \- Private free-text field to help identify an itemâs physical location.

  * `weight` \- In grams. Must be a non-negative integer.

  * `format_quantity` \- Number of items that this item counts as (for shipping).

### Conditions Â¶

When you specify a media condition, it must exactly match one of these:

  * `Mint (M)`

  * `Near Mint (NM or M-)`

  * `Very Good Plus (VG+)`

  * `Very Good (VG)`

  * `Good Plus (G+)`

  * `Good (G)`

  * `Fair (F)`

  * `Poor (P)`

Sleeve condition may be any of the above, or:

  * `Not Graded`

  * `Generic`

  * `No Cover`

  * **Parameters**
  * upload
    `file` (required)

The CSV file of items to alter in your inventory.

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        Location: https://api.discogs.com/inventory/upload/599632  
        

  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`409`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`415`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`422`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

## Delete inventory  __

Delete inventory

POST

`/inventory/upload/delete`

Upload a CSV of listings to delete from your inventory.

### File structure Â¶

The file you upload must be a comma-separated CSV. The first row must be a header with lower case field names.

Hereâs an example:
    
    
    listing_id
    12345678
    98765432
    31415926

### Required fields Â¶

  * `listing_id` \- Must be a number. This is the ID of the listing you wish to delete.

  * **Parameters**
  * upload
    `file` (required)

The CSV file listing items to remove from your inventory.

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        Location: https://api.discogs.com/inventory/upload/599632  
        

  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`409`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`415`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`422`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

## Get recent uploads  __

Get recent uploads

GET

`/inventory/upload`

Get a list of all recent inventory uploads. Accepts Pagination parameters.

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

##### Body
        
        {
          "items": [
            {
              "status": "success",
              "results": "CSV file contains 1 records.<p>Processed 1 records.",
              "created_ts": "2017-12-18T09:20:28",
              "finished_ts": "2017-12-18T09:20:29",
              "filename": "add.csv",
              "type": "change",
              "id": 119615
            }
          ],
          "pagination": {
            "per_page": 50,
            "items": 1,
            "page": 1,
            "urls": {},
            "pages": 1
          }
        }

  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

## Get an upload  __

Get an upload

GET

`/inventory/upload/{id}`

Get details about the status of an inventory upload.

  * **Parameters**
  * id
    `number` (required)

Id of the export.

  * **Request** Toggle
  * ##### Headers
        
        Content-Type: multipart/form-data  
        If-Modified-Since: Thu, 27 Sep 2018 09:20:28 GMT  
        

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

##### Body
        
        {
          "status": "success",
          "results": "CSV file contains 1 records.<p>Processed 1 records.",
          "created_ts": "2017-12-18T09:20:28",
          "finished_ts": "2017-12-18T09:20:29",
          "filename": "add.csv",
          "type": "change",
          "id": 119615
        }

  * **Response`304`**
  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`404`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

Next  ____Previous

* * *
