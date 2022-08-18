# Motivation

Allow Express to be used in a an object-oriented manner, without abstracting it away.

## Minimal

Controlled is a very minimal approach to a "structured" web server. It's not adding a thick layer of abstraction like some more high level frameworks do. It just bridges the gap between Express and an object-oriented application structure. I don't think the more high level (or non object-oriented approach) is bad, this is just what I wanted to have for my projects.

## Why

I created this project when trying to use Express in a more object oriented way. I was creating controllers and services and using my library Containor for dependency injection. It worked fine but the only annoying part was that the integration with Express was a bit cumbersome. I wrote a small wrapper function and decided to extract this to a library for everyone to use.

## Why Express and Containor?

Express is the most popular web server for Node and Containor is my own dependency injection library. That's it...

However, I am definitely open to supporting other web servers and/or depenceny injection libraries. Controlled is very small and generic, so this should be easy to do. Any suggestions or contributions are welcome!
