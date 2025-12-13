# Images  __

The Image resource represents a user-contributed image of a database object, such as Artists or Releases. Image requests requireauthentication and are subject to rate limiting.

Itâs unlikely that youâll ever have to construct an image URL; images keys on other resources use fully-qualified URLs, including hostname and protocol. To retrieve images, authenticate via OAuth or Discogs Auth and fetch the object that contains the image of interest (e.g., the release, user profile, etc.). The image URL will be in the response using the HTTPS protocol, and requesting that URL should succeed.

Next  ____Previous

* * *
