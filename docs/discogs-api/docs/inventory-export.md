# Inventory Export  __

## Export your inventory __

Export your inventory

POST

`/inventory/export`

Request an export of your inventory as a CSV.

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        Location: https://api.discogs.com/inventory/export/599632  
        

  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`409`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

## Get recent exports  __

Get recent exports

GET

`/inventory/export`

Get a list of all recent exports of your inventory. Accepts Pagination parameters.

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

##### Body
        
        {
          "items": [
            {
              "status": "success",
              "created_ts": "2018-09-27T12:59:02",
              "url": "https://api.discogs.com/inventory/export/599632",
              "finished_ts": "2018-09-27T12:59:02",
              "download_url": "https://api.discogs.com/inventory/export/599632/download",
              "filename": "cburmeister-inventory-20180927-1259.csv",
              "id": 599632
            }
          ],
          "pagination": {
            "per_page": 50,
            "items": 15,
            "page": 1,
            "urls": {},
            "pages": 1
          }
        }

  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

## Get an export  __

Get an export

GET

`/inventory/export/{id}`

Get details about the status of an inventory export.

  * **Parameters**
  * id
    `number` (required)

Id of the export.

  * **Request** Toggle
  * ##### Headers
        
        Content-Type: multipart/form-data  
        If-Modified-Since: Thu, 27 Sep 2018 12:50:39 GMT  
        

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        Last-Modified: Thu, 27 Sep 2018 12:59:02 GMT  
        

##### Body
        
        {
          "status": "success",
          "created_ts": "2018-09-27T12:50:39",
          "url": "https://api.discogs.com/inventory/export/599632",
          "finished_ts": "2018-09-27T12:59:02",
          "download_url": "https://api.discogs.com/inventory/export/599632/download",
          "filename": "cburmeister-inventory-20180927-1259.csv",
          "id": 599632
        }

  * **Response`304`**
  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`404`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

## Download an export  __

Download an export

GET

`/inventory/export/{id}/download`

Download the results of an inventory export.

  * **Parameters**
  * id
    `number` (required)

Id of the export.

  * **Response`200`**Toggle
  * ##### Headers
        
        Content-Type: text/csv; charset=utf-8  
        Content-Disposition: attachment; filename=cburmeister-inventory-20180927-1259.csv  
        

  * **Response`401`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

  * **Response`404`**Toggle
  * ##### Headers
        
        Content-Type: application/json  
        

Next  ____Previous

* * *
