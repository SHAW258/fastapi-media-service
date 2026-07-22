from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field, AliasChoices

# User & Auth Schemas
class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_superuser: bool

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class TokenData(BaseModel):
    username: Optional[str] = None

# Media Schemas
class MediaItemBase(BaseModel):
    title: str
    description: str
    mediaType: str = Field(..., validation_alias=AliasChoices('mediaType', 'media_type'), serialization_alias='mediaType')
    format: str
    category: str
    duration: str
    thumbnailUrl: str = Field(..., validation_alias=AliasChoices('thumbnailUrl', 'thumbnail_url'), serialization_alias='thumbnailUrl')
    mediaUrl: str = Field(..., validation_alias=AliasChoices('mediaUrl', 'media_url'), serialization_alias='mediaUrl')
    artist: Optional[str] = None
    views: int = 0
    likes: int = 0
    isPremium: bool = Field(..., validation_alias=AliasChoices('isPremium', 'is_premium'), serialization_alias='isPremium')
    createdAt: str = Field(..., validation_alias=AliasChoices('createdAt', 'created_at'), serialization_alias='createdAt')

class MediaItemCreate(MediaItemBase):
    pass

class MediaItemSchema(MediaItemBase):
    id: int

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class MediaListResponse(BaseModel):
    success: bool = True
    message: str
    total: int
    data: List[MediaItemSchema]

class CategorySummary(BaseModel):
    name: str
    total: int

class CategoriesResponse(BaseModel):
    success: bool = True
    message: str
    total: int
    data: List[CategorySummary]

class CategoryMediaResponse(BaseModel):
    success: bool = True
    message: str
    category: str
    total: int
    data: List[MediaItemSchema]

class ArtistSummary(BaseModel):
    id: int
    name: str
    totalSongs: int

class ArtistsResponse(BaseModel):
    success: bool = True
    message: str
    total: int
    data: List[ArtistSummary]

class ArtistDetail(BaseModel):
    id: int
    name: str
    totalSongs: int
    songs: List[MediaItemSchema]

class ArtistDetailResponse(BaseModel):
    success: bool = True
    message: str
    data: ArtistDetail
