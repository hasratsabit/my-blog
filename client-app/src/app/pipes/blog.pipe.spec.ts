import { BlogPipe } from './blog.pipe';

describe('BlogPipe', () => {
  it('create an instance', () => {
    const pipe = new BlogPipe();
    expect(pipe).toBeTruthy();
  });
});
