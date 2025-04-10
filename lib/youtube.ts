export interface YouTubeVideoResponse {
  items: YouTubeVideo[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeVideo {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
      standard?: YouTubeThumbnail;
      maxres?: YouTubeThumbnail;
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent?: "none" | "live" | "upcoming";
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount?: string; // Nota: A API do YouTube não retorna mais contagens de deslike
    favoriteCount: string;
    commentCount: string;
  };
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeChannelResponse {
  items: YouTubeChannel[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeChannel {
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl?: string;
    publishedAt: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
  contentDetails?: {
    relatedPlaylists: {
      uploads: string;
    };
  };
}

export interface YouTubeCommentThreadResponse {
  items: YouTubeCommentThread[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeCommentThread {
  id: string;
  snippet: {
    channelId: string;
    videoId: string;
    topLevelComment: YouTubeComment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
}

export interface YouTubeComment {
  id: string;
  snippet: {
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId?: {
      value: string;
    };
    videoId?: string;
    textDisplay: string;
    textOriginal: string;
    parentId?: string;
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeSearchResult[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeSearchResult {
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: "none" | "live" | "upcoming";
  };
}

export interface YouTubePlaylistItemsResponse {
  items: YouTubePlaylistItem[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubePlaylistItem {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
      standard?: YouTubeThumbnail;
      maxres?: YouTubeThumbnail;
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
}

export interface YouTubeVideoWithLiveDetails extends YouTubeVideo {
  liveStreamingDetails?: {
    actualStartTime?: string
    actualEndTime?: string
    scheduledStartTime?: string
    scheduledEndTime?: string
    concurrentViewers?: string
    activeLiveChatId?: string
  }
}

const API_BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function getVideoDetails(videoId: string): Promise<YouTubeVideo> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/videos?part=snippet,statistics,contentDetails,liveStreamingDetails&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data: YouTubeVideoResponse = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error(`Video with ID ${videoId} not found`);
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw new Error("Failed to fetch video details");
  }
}

export async function getChannelDetails(
  channelId: string
): Promise<YouTubeChannel> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/channels?part=snippet,statistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data: YouTubeChannelResponse = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error(`Channel with ID ${channelId} not found`);
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching channel details:", error);
    throw new Error("Failed to fetch channel details");
  }
}

export async function getVideoComments(
  videoId: string,
  maxResults: number = 20
): Promise<YouTubeCommentThread[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/commentThreads?part=snippet&videoId=${videoId}&maxResults=${maxResults}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data: YouTubeCommentThreadResponse = await response.json();

    if (!data.items) {
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Error fetching video comments:", error);
    throw new Error("Failed to fetch video comments");
  }
}

export async function getChannelLatestVideoOrLiveStream(
  channelId: string
): Promise<{ videoId: string; isLive: boolean }> {
  try {
    const liveResponse = await fetch(
      `${API_BASE_URL}/search?part=snippet&channelId=${channelId}&eventType=live&type=video&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!liveResponse.ok) {
      throw new Error(`YouTube API error: ${liveResponse.status}`);
    }

    const liveData: YouTubeSearchResponse = await liveResponse.json();

    if (
      liveData.items &&
      liveData.items.length > 0 &&
      liveData.items[0].snippet.liveBroadcastContent === "live"
    ) {
      return {
        videoId: liveData.items[0].id.videoId!,
        isLive: true,
      };
    }

    const channelResponse = await fetch(
      `${API_BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.status}`);
    }

    const channelData: YouTubeChannelResponse = await channelResponse.json();

    if (
      !channelData.items ||
      channelData.items.length === 0 ||
      !channelData.items[0].contentDetails?.relatedPlaylists.uploads
    ) {
      throw new Error(
        `Channel uploads playlist not found for channel ID ${channelId}`
      );
    }

    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;

    const playlistResponse = await fetch(
      `${API_BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.status}`);
    }

    const playlistData: YouTubePlaylistItemsResponse =
      await playlistResponse.json();

    if (!playlistData.items || playlistData.items.length === 0) {
      throw new Error(
        `No videos found in uploads playlist for channel ID ${channelId}`
      );
    }

    return {
      videoId: playlistData.items[0].snippet.resourceId.videoId,
      isLive: false,
    };
  } catch (error) {
    console.error("Error fetching channel latest video or live stream:", error);
    throw new Error("Failed to fetch channel latest video or live stream");
  }
}

/**
 * Sends a message to a YouTube live chat
 */
export async function sendLiveChatMessage(liveChatId: string, message: string, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/liveChat/messages?part=snippet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        snippet: {
          liveChatId: liveChatId,
          type: "textMessageEvent",
          textMessageDetails: {
            messageText: message,
          },
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("YouTube API error:", errorData)
      throw new Error(`YouTube API error: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Error sending live chat message:", error)
    return false
  }
}

/**
 * Gets the live chat ID for a live video
 */
export async function getLiveChatId(videoId: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/videos?part=liveStreamingDetails&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0 || !data.items[0].liveStreamingDetails?.activeLiveChatId) {
      return null
    }

    return data.items[0].liveStreamingDetails.activeLiveChatId
  } catch (error) {
    console.error("Error fetching live chat ID:", error)
    return null
  }
}

/**
 * Adds a comment to a YouTube video
 */
export async function addVideoComment(
  videoId: string,
  commentText: string,
  accessToken: string
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/commentThreads?part=snippet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        snippet: {
          videoId: videoId,
          topLevelComment: {
            snippet: {
              textOriginal: commentText
            }
          }
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('YouTube API error:', errorData)
      throw new Error(`YouTube API error: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('Error adding video comment:', error)
    return false
  }
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} segundos atrás`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutos atrás`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} horas atrás`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} dias atrás`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} meses atrás`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} anos atrás`;
}

export function formatCount(count: string | number): string {
  const num = typeof count === "string" ? parseInt(count, 10) : count;

  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return num.toString();
}