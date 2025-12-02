<script setup lang="ts">
import { computed } from "vue";
import type { GithubUser } from "@/types";
import IconLocation from "./icons/IconLocation.vue";
import IconTwitter from "./icons/IconTwitter.vue";
import IconWebsite from "./icons/IconWebsite.vue";
import IconCompany from "./icons/IconCompany.vue";

const props = defineProps<{
  user: GithubUser;
}>();
const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const joinDate = computed(() => formatter.format(new Date(props.user.created_at)));
const bio = computed(() => (props.user.bio ? props.user.bio : "This profile has no bio"));
const userBlog = computed(() => {
  const blog = props.user.blog;

  if (!blog) return false;

  const reg = /^https?:\/\//;

  if (reg.test(blog)) return blog;

  return `http://${blog}`;
});
</script>

<template>
  <div class="user-info">
    <img class="avatar" :src="props.user.avatar_url" alt="user avatar" />
    <div class="main">
      <div class="identifier">
        <p class="name">{{ props.user.name }}</p>
        <a :href="`https://github.com/${props.user.login}`" target="_blank" class="login"
          >@{{ props.user.login }}</a
        >
      </div>
      <p class="join-date">Joined {{ joinDate }}</p>
    </div>
    <div class="details">
      <p class="bio" :class="{ unavailable: !props.user.bio }">{{ bio }}</p>
      <div class="stats">
        <div class="stat">
          <p class="description">Repos</p>
          <p class="count">{{ props.user.public_repos }}</p>
        </div>
        <div class="stat">
          <p class="description">Followers</p>
          <p class="count">{{ props.user.followers }}</p>
        </div>
        <div class="stat">
          <p class="description">Following</p>
          <p class="count">{{ props.user.following }}</p>
        </div>
      </div>
      <div class="iconics">
        <div class="iconic" :class="{ unavailable: !props.user.location }">
          <IconLocation />
          <p class="content">{{ props.user.location || "Not available" }}</p>
        </div>
        <div class="iconic" :class="{ unavailable: !props.user.twitter_username }">
          <IconTwitter />
          <p class="content">{{ props.user.twitter_username || "Not available" }}</p>
        </div>
        <div class="iconic" :class="{ unavailable: !props.user.blog }">
          <IconWebsite />
          <a :href="userBlog" target="_blank" v-if="userBlog" class="content link">{{
            props.user.blog
          }}</a>
          <p v-else class="content">Not available</p>
        </div>
        <div class="iconic" :class="{ unavailable: !props.user.company }">
          <IconCompany />
          <p class="content">{{ props.user.company || "Not available" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/scss/breakpoints";
@use "@/scss/border_radii";
@use "@/scss/utils";
@use "@/scss/text_presets";

.user-info {
  @extend %radius-16;
  @extend %shadow-primary;

  background: var(--ui-color-primary);
  padding: 3rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "P M"
    "P D";
  column-gap: 2rem;
  row-gap: 1.5rem;

  .avatar {
    width: 7.25rem;
    min-width: 7.25rem;
    aspect-ratio: 1;
    border-radius: 100%;
    grid-area: P;
  }

  .main {
    grid-area: M;
    display: flex;
    justify-content: space-between;

    .identifier {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;

      .name {
        @extend %text-preset-1;

        color: var(--text-color-secondary);
      }

      .login {
        @extend %text-preset-4;
        @extend %focus;
        @extend %radius-4;

        color: var(--text-color-accent);
        text-decoration: none;
        width: fit-content;
      }
    }

    .join-date {
      @extend %text-preset-6;

      color: var(--text-color-tertiary);
    }
  }

  .details {
    grid-area: D;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .bio {
      @extend %text-preset-5;

      color: var(--text-color-tertiary);
      width: 30rem;
    }

    .stats {
      @extend %radius-10;

      background: var(--ui-color-secondary);
      display: flex;
      justify-content: space-between;
      padding: 1rem 2rem;

      .stat {
        .description {
          @extend %text-preset-7;

          color: var(--text-color-tertiary);
        }

        .count {
          @extend %text-preset-2;

          color: var(--text-color-secondary);
        }
      }
    }

    .iconics {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      gap: 1rem;

      .iconic {
        display: flex;
        gap: 1rem;

        .icon {
          flex-shrink: 0;
        }

        .content {
          @extend %text-preset-6;
          @extend %focus;
          @extend %radius-4;

          color: var(--text-color-tertiary);
          word-break: break-all;

          &.link {
            text-decoration: none;

            @media (hover: hover) {
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: breakpoints.$tablet) {
    padding: 3rem 2rem;

    .details {
      .bio {
        width: 100%;
      }
    }
  }

  @media (max-width: breakpoints.$mobile) {
    grid-template-areas:
      "P M"
      "D D";

    .avatar {
      width: 4.375rem;
      min-width: 4.375rem;
    }

    .main {
      flex-direction: column;
      gap: 0.25rem;
    }
  }

  @media (max-width: breakpoints.$mobile-small) {
    .details {
      .stats {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .iconics {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
