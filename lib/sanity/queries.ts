import { sanityClient } from "./client";

// Profile
export async function getProfile() {
  return sanityClient.fetch(`*[_type == "profile"][0]{
    name, tagline, bio, image, email, github, linkedin, twitter, resume
  }`);
}

// Skills
export async function getSkills() {
  return sanityClient.fetch(`*[_type == "skill"] | order(category asc, order asc) {
    name, category, level, icon
  }`);
}

// Experience
export async function getExperience() {
  return sanityClient.fetch(`*[_type == "experience"] | order(startDate desc) {
    company, role, startDate, endDate, current, description, technologies
  }`);
}

// Education
export async function getEducation() {
  return sanityClient.fetch(`*[_type == "education"] | order(graduationDate desc) {
    institution, degree, field, graduationDate, gpa, description
  }`);
}

// Publications
export async function getPublications() {
  return sanityClient.fetch(`*[_type == "publication"] | order(publishedDate desc) {
    title, authors, venue, publishedDate, abstract, url, pdf, type
  }`);
}

// Projects
export async function getProjects() {
  return sanityClient.fetch(`*[_type == "project"] | order(order asc) {
    title, description, technologies, github, demo, image, featured, order
  }`);
}

// Writings
export async function getWritings() {
  return sanityClient.fetch(`*[_type == "writing"] | order(publishedAt desc) {
    title, slug, excerpt, publishedAt, tags, readTime
  }`);
}

export async function getWritingBySlug(slug: string) {
  return sanityClient.fetch(`*[_type == "writing" && slug.current == $slug][0]{
    title, slug, excerpt, publishedAt, tags, readTime, body
  }`, { slug });
}

// Photography
export async function getPhotos() {
  return sanityClient.fetch(`*[_type == "photo"] | order(dateTaken desc) {
    title, slug, image, location, dateTaken, description, tags
  }`);
}

export async function getPhotoBySlug(slug: string) {
  return sanityClient.fetch(`*[_type == "photo" && slug.current == $slug][0]{
    title, slug, image, location, dateTaken, description, tags
  }`, { slug });
}

// Recipes
export async function getRecipes() {
  return sanityClient.fetch(`*[_type == "recipe"] | order(publishedAt desc) {
    title, slug, description, publishedAt, cuisine, difficulty, prepTime, cookTime, image, tags
  }`);
}

export async function getRecipeBySlug(slug: string) {
  return sanityClient.fetch(`*[_type == "recipe" && slug.current == $slug][0]{
    title, slug, description, publishedAt, cuisine, difficulty, prepTime, cookTime, image, tags, ingredients, instructions, notes
  }`, { slug });
}

// Rants
export async function getRants() {
  return sanityClient.fetch(`*[_type == "rant"] | order(publishedAt desc) {
    title, slug, excerpt, publishedAt, tags, readTime
  }`);
}

export async function getRantBySlug(slug: string) {
  return sanityClient.fetch(`*[_type == "rant" && slug.current == $slug][0]{
    title, slug, excerpt, publishedAt, tags, readTime, body
  }`, { slug });
}
