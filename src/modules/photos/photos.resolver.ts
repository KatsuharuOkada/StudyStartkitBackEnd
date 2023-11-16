import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PhotosService } from './photos.service';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../vendors/guards/auth.guard';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { UsersEntity } from '../../entities/users.entity';
import { PagerDto } from '../../vendors/dto/pager.dto';
import { CreatePhotoDto } from './create.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class PhotosResolver extends BaseResolver {
  constructor(private photosService: PhotosService) {
    super();
  }

  /**
   * @author: ThanhLD
   * API getPhoto
   * Get photo by id
   * @param user: user authenticated
   * @param id: number
   * @returns photo
   */
  @Query('getPhoto')
  async getPhoto(@GqlUser() user: UsersEntity, @Args('id') id: number) {
    const data = await this.photosService.getPhoto(id);
    return this.response(data);
  }

  /**
   * @author: ThanhLD
   * API getPhotos
   * Get list photos
   * @param user: user authenticated
   * @param pager: {limit: number, offset?: number, page?: number, isTakeAll?: boolean}
   * @returns  {data, paging}
   */
  @Query('getPhotos')
  async getPhotos(@GqlUser() user: UsersEntity, @Args('Pager') pager: PagerDto) {
    const data = await this.photosService.getPhotos(pager);
    // throw new NotFoundException('co chut loi');
    return this.response(data);
  }

  /**
   * @author: ThanhLD
   * API addPhoto
   * Add new photo
   * @param user: user authenticated
   * @param params: {url: string, comment:string}
   * @returns new photo
   */
  @Mutation('addPhoto')
  async addPhoto(@GqlUser() user: UsersEntity, @Args('params') params: CreatePhotoDto) {
    const data = await this.photosService.addPhoto(user, params);
    // throw new NotFoundException();
    return this.response(data);
  }

  /**
   * @author: ThanhLD
   * API updatePhoto
   * @param user: user authenticated
   * @param id: number
   * @param params: {comment:string}
   * @returns new photo
   */
  @Mutation('updatePhoto')
  async updatePhoto(@GqlUser() user: UsersEntity, @Args('id') id: number, @Args('params') params) {
    const data = await this.photosService.updatePhoto(id, params, user);
    return this.response(data);
  }

  /**
   * @author: ThanhLD
   * API deletePhoto
   * @param user: user authenticated
   * @param id: number
   * @returns boolean
   */
  @Mutation('deletePhoto')
  async deletePhoto(@GqlUser() user: UsersEntity, @Args('id') id: number) {
    const data = await this.photosService.deletePhoto(id, user);
    return this.response(data);
  }
}
