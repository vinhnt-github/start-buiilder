DO $$ BEGIN
 CREATE TYPE "public"."Flag" AS ENUM('Y', 'N');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('DRAFT', 'PUBLISHED', 'DELETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."PostType" AS ENUM('ARTICLE', 'SCRIPT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "PostType",
	"title" varchar(110) NOT NULL,
	"emoji" varchar DEFAULT '🫥',
	"body_markdown" text NOT NULL,
	"body_html" text NOT NULL,
	"slug" varchar(12) NOT NULL,
	"path" varchar(113) NOT NULL,
	"liked_count" integer DEFAULT 0,
	"comments_count" integer DEFAULT 0,
	"published_at" timestamp,
	"status" "status" NOT NULL,
	"pinned" boolean DEFAULT false,
	"delete_flag" varchar,
	"author_id" integer,
	"created_by" integer NOT NULL,
	"updated_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"display_name" varchar(256) NOT NULL,
	"tagging_count" integer,
	"color" varchar NOT NULL,
	"description" text,
	"flag" "Flag" DEFAULT 'N',
	"image" varchar(1000),
	"created_by" integer NOT NULL,
	"updated_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags-to-posts" (
	"tag_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "tags-to-posts_tag_id_post_id_pk" PRIMARY KEY("tag_id","post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"username" varchar(256),
	"given_name" varchar(256),
	"family_name" varchar(256),
	"description" text,
	"avatar" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags-to-posts" ADD CONSTRAINT "tags-to-posts_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags-to-posts" ADD CONSTRAINT "tags-to-posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
